import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
  DirectoryTreeOptions,
} from 'directory-tree';
import path from 'path';
import fs from 'fs/promises';
import { createHash } from 'crypto';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

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

  async createNotebook(dirpath: string): Promise<void> {
    try {
      const notebookName = `MrNote-${uuidv4().substring(0, 8)}`;
      const fullPath = path.join(this.root, dirpath, notebookName);

      await fs.writeFile(fullPath, JSON.stringify(defaultContent), 'utf-8');
      this.socket.emit('tree', {
        ...this.scan(),
      });
    } catch (err: any) {
      // emit error
      console.log(err);
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
