import http from 'http';
import { Server, Socket } from 'socket.io';
import { Cell, Chapter } from '../types';

import FileService from './FileService';
import NotebookService from './NotebokService';

export class Gateway {
  private readonly ioServer: Server;

  constructor(
    // port: number,
    server: http.Server,
    private readonly fileService: FileService,
    private readonly notebookService: NotebookService
  ) {
    this.ioServer = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.initListeners();
  }

  initListeners(): void {
    this.ioServer.on('connection', (socket) => {
      socket.emit('tree', {
        ...this.fileService.scan(),
      });

      // disconnect
      socket.on('disconnect', () => this.onDisconnect(socket.id));

      socket.on('fetchCells', (payload) => this.onFetchCells(socket, payload));

      socket.on('createFolder', (payload) =>
        this.onCreateFolder(socket, payload)
      );

      socket.on('createNotebook', (payload, ack) =>
        this.createNotebook(payload, ack)
      );

      socket.on('saveNotebookAs', (payload, ack) =>
        this.saveNotebook(socket, payload, ack, true)
      );

      socket.on('saveNotebook', (payload, ack) =>
        this.saveNotebook(socket, payload, ack, false)
      );

      socket.on('renameFile', (payload, ack) => this.renameFile(payload, ack));

      socket.on('deleteFiles', (payload, ack) =>
        this.deleteFiles(payload, ack)
      );
    });
  }

  onDisconnect(socketId: string): void {
    this.fileService.closedSocket(socketId);
    this.emitTree();
  }

  async deleteFiles(
    payload: { trees: { path: string }[] },
    ack: (error: string | undefined) => void
  ): Promise<void> {
    try {
      await this.fileService.deleteFiles(payload.trees);
      ack(undefined);

      this.emitTree();
    } catch (error: unknown) {
      ack(error as string);
    }
  }

  async renameFile(
    payload: { oldPath: string; newPath: string },
    ack: (error: string | undefined) => void
  ): Promise<void> {
    try {
      await this.fileService.renameFile(payload.oldPath, payload.newPath);

      this.emitTree();
    } catch (error: unknown) {
      ack(error as string);
    }
  }

  async saveNotebook(
    scoket: Socket,
    payload: { path: string; data: { chapters: Chapter[]; cells: Cell[] } },
    ack: (error: string | undefined) => void,
    isNew: boolean
  ): Promise<void> {
    try {
      const id = await this.notebookService.saveNotebook(
        payload.path,
        payload.data,
        isNew
      );

      if (!isNew) {
        scoket.to(id).emit('fetchedCells', payload.data);
      }

      ack(undefined);
    } catch (error: unknown) {
      ack(error as string);
    }
  }

  async createNotebook(
    payload: { path: string },
    ack: (error: string | undefined, filename?: string) => void
  ): Promise<void> {
    try {
      const filename = await this.notebookService.createNotebook(payload.path);
      ack(undefined, filename);

      this.emitTree();
    } catch (error: unknown) {
      ack(error as string);
    }
  }

  async onFetchCells(
    socket: Socket,
    payload: { filepath: string }
  ): Promise<void> {
    try {
      const [id, json] = await this.notebookService.fetchNotebook(
        payload.filepath
      );

      socket.emit('fetchedCells', json);
      socket.join(id);
      this.fileService.openFile(id, socket.id);
      this.emitTree();
    } catch (error: unknown) {
      socket.emit('fetchedError', { error });
    }
  }

  async onCreateFolder(
    socket: Socket,
    payload: { crumbPath: string }
  ): Promise<void> {
    try {
      await this.fileService.createFolder(payload.crumbPath);
      this.emitTree();
    } catch (error: unknown) {
      socket.emit('error', { error });
    }
  }

  private emitTree() {
    this.ioServer.emit('tree', {
      ...this.fileService.scan(),
    });
  }
}
