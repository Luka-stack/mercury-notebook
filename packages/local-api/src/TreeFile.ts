import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
  DirectoryTreeOptions,
} from 'directory-tree';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { createHash } from 'crypto';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

interface Cell {
  id: string;
  chapterId: string;
  content: string;
  type: 'text' | 'code';
}

interface Chapter {
  id: string;
  description: Cell;
  content: string[];
}

export class TreeFile {
  private openFiles: Map<string, string>;
  private scanOptions: DirectoryTreeOptions = {
    extensions: /\.js$/,
    attributes: ['type', 'mtime'],
  };

  constructor(private root: string, private socket: Server) {
    this.openFiles = new Map();
    this.socket = socket;
  }

  scan(
    partialPath: string = ''
  ): DirectoryTree & { id?: string; active?: boolean } {
    const fullPath = path.join(this.root, partialPath);

    return directoryTree(
      fullPath,
      this.scanOptions,
      this.idCallback,
      this.idCallback
    );
  }

  async fetchCells(filepath: string, socketId: string): Promise<void> {
    const fullPath = path.join(this.root, filepath);

    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      const id = createHash('sha1').update(fullPath).digest('base64');

      try {
        this.socket.to(socketId).emit('fetchedCells', JSON.parse(result));
        this.socket.in(socketId).socketsJoin(id);
        this.openFile(id, socketId);
      } catch (err: any) {
        this.socket
          .to(socketId)
          .emit('fetchedError', { error: 'Error while parsing file' });
      }
    } catch (err: any) {
      this.socket
        .to(socketId)
        .emit('fetchedError', { error: 'Notebook was not found' });
    }
  }

  openFile(fileId: string, socketId: string): void {
    if (this.openFiles.has(fileId)) {
      return;
    }

    this.openFiles.set(fileId, socketId);
    this.socket.emit('tree', {
      ...this.scan(),
    });
  }

  closeFile(fileId: string): void {
    if (!this.openFiles.has(fileId)) {
      return;
    }

    this.openFiles.delete(fileId);
    this.socket.emit('tree', {
      ...this.scan(),
    });
  }

  closedSocket(socketId: string): void {
    this.openFiles.forEach((v, k) => {
      if (v === socketId) {
        this.openFiles.delete(k);
        return;
      }
    });

    this.socket.emit('tree', {
      ...this.scan(),
    });
  }

  async createFolder(dirpath: string): Promise<void> {
    try {
      const dirname = `Folder-${uuidv4().substring(0, 8)}`;
      const fullPath = path.join(this.root, dirpath, dirname);

      await fs.mkdir(fullPath);
      this.socket.emit('tree', {
        ...this.scan(),
      });
    } catch (err: any) {
      // emit error
      console.log(err);
    }
  }

  async createNotebook(dirpath: string): Promise<string> {
    try {
      const filename = `MrNote-${uuidv4().substring(0, 8)}.js`;
      const fullPath = path.join(this.root, dirpath, filename);

      await fs.writeFile(fullPath, JSON.stringify(defaultContent), 'utf-8');

      this.socket.emit('tree', {
        ...this.scan(),
      });

      return filename;
    } catch (err: any) {
      console.error(err); // log error
      throw err;
    }
  }

  async saveNotebookAs(
    dirpath: string,
    content: { chapters: Chapter[]; cells: Cell[] }
  ): Promise<void> {
    try {
      const fullPath = path.join(this.root, dirpath);

      if (existsSync(fullPath)) {
        throw 'File already exists';
      }

      await fs.writeFile(fullPath, JSON.stringify(content), 'utf-8');
      this.socket.emit('tree', {
        ...this.scan(),
      });
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async renameFile(oldPath: string, newPath: string): Promise<void> {
    try {
      if (existsSync(newPath)) {
        throw 'File already exists';
      }

      await fs.rename(oldPath, newPath);

      const newHash = createHash('sha1').update(newPath).digest('base64');
      const oldHash = createHash('sha1').update(oldPath).digest('base64');
      const socketId = this.openFiles.get(oldHash);

      this.openFiles.delete(oldHash);
      if (socketId) this.openFile(newHash, socketId);
      else {
        this.socket.emit('tree', {
          ...this.scan(),
        });
      }
    } catch (err: unknown) {
      console.error(err);
      throw err;
    }
  }

  async deleteFiles(treeFile: { path: string }[]): Promise<void> {
    for (let tree of treeFile) {
      try {
        await fs.rm(tree.path);
      } catch (err: unknown) {
        console.error(err);
      }
    }

    this.socket.emit('tree', {
      ...this.scan(),
    });
  }

  async saveNotebook(
    dirpath: string,
    content: { chapters: Chapter[]; cells: Cell[] }
  ): Promise<void> {
    try {
      const fullPath = path.join(this.root, dirpath);

      await fs.writeFile(fullPath, JSON.stringify(content), 'utf-8');
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  }

  private idCallback: DirectoryTreeCallback = (
    item: DirectoryTree & { id?: string; active?: boolean },
    path: string
  ) => {
    item.id = createHash('sha1').update(path).digest('base64');
    item.active = this.openFiles.has(item.id);
  };
}

const defaultContent = {
  chapters: [
    {
      id: 'defaultChapter',
      description: {
        id: 'chapterDescription',
        type: 'text',
        content: '#### Chapter description - click to edit',
        chapterId: 'defaultChapter',
      },
      content: [],
    },
  ],
  cells: [],
};
