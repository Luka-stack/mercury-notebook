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
    this.ioServer = new Server(server);

    this.initListeners();
  }

  initListeners(): void {
    this.ioServer.on('connection', (socket) => {
      socket.emit('tree', {
        ...this.fileService.scan(),
      });

      socket.on('disconnect', () => this.onDisconnect(socket));

      socket.on('fetchCells', (payload, ack) =>
        this.onFetchCells(socket, payload, ack)
      );

      socket.on('createFolder', (payload, ack) =>
        this.onCreateFolder(payload, ack)
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

  async onDisconnect(socket: Socket): Promise<void> {
    const clients = await this.ioServer.in(socket.data.file).fetchSockets();
    let newClient;

    if (clients.length) {
      newClient = clients[0].id;
    }

    this.fileService.closedSocket(socket.data.file, newClient);
    this.emitTree();
  }

  async deleteFiles(
    payload: { trees: { path: string }[] },
    ack: (error: { msg: string } | undefined) => void
  ): Promise<void> {
    try {
      await this.fileService.deleteFiles(payload.trees);
      ack(undefined);

      this.emitTree();
    } catch (error: unknown) {
      ack({ msg: error as string });
    }
  }

  async renameFile(
    payload: { oldPath: string; newPath: string },
    ack: (error: { msg: string } | undefined) => void
  ): Promise<void> {
    try {
      await this.fileService.renameFile(payload.oldPath, payload.newPath);

      this.emitTree();
      ack(undefined);
    } catch (error: unknown) {
      ack({ msg: error as string });
    }
  }

  async saveNotebook(
    socket: Socket,
    payload: { path: string; data: { chapters: Chapter[]; cells: Cell[] } },
    ack: (error: { msg: string } | undefined) => void,
    isNew: boolean
  ): Promise<void> {
    try {
      const id = await this.notebookService.saveNotebook(
        payload.path,
        payload.data,
        isNew
      );

      if (!isNew) {
        socket.broadcast.to(id).emit('notebookChanged');
      }

      ack(undefined);
    } catch (error: unknown) {
      ack({ msg: error as string });
    }
  }

  async createNotebook(
    payload: { path: string },
    ack: (error: { msg: string } | undefined, filename?: string) => void
  ): Promise<void> {
    try {
      const filename = await this.notebookService.createNotebook(payload.path);
      ack(undefined, filename);

      this.emitTree();
    } catch (error: unknown) {
      ack({ msg: error as string });
    }
  }

  async onFetchCells(
    socket: Socket,
    payload: { filepath: string },
    ack: (error: { msg: string } | undefined, data?: {}) => void
  ): Promise<void> {
    try {
      const [id, json] = await this.notebookService.fetchNotebook(
        payload.filepath
      );

      socket.join(id);
      socket.data.file = id;
      const open = this.fileService.openFile(id, socket.id);

      if (!open) {
        socket.emit('sharedNotebook');
      }

      ack(undefined, json);

      this.emitTree();
    } catch (error: unknown) {
      ack({ msg: error as string });
    }
  }

  async onCreateFolder(
    payload: { path: string },
    ack: (error: { msg: string } | undefined) => void
  ): Promise<void> {
    try {
      await this.fileService.createFolder(payload.path);
      this.emitTree();

      ack(undefined);
    } catch (error: unknown) {
      ack({ msg: error as string });
    }
  }

  private emitTree() {
    this.ioServer.emit('tree', {
      ...this.fileService.scan(),
    });
  }
}
