import path from 'path';
import fs from 'fs';
import { mkdir, rename, rm } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
  DirectoryTreeOptions,
} from 'directory-tree';

const DIR_NAME_TEMPLATE = 'Folder';

export default class FileService {
  private _openFiles: Map<string, string> = new Map();
  private _scanOptions: DirectoryTreeOptions = {
    extensions: /\.jsnb$/,
    attributes: ['type', 'mtime'],
  };

  constructor(private readonly rootPath: string) {}

  scan(): DirectoryTree & { id?: string; active?: boolean } {
    return directoryTree(
      this.rootPath,
      this._scanOptions,
      this.idCallback,
      this.idCallback
    );
  }

  openFile(fileId: string, socketId: string): boolean {
    if (this._openFiles.has(fileId)) {
      return false;
    }

    this._openFiles.set(fileId, socketId);
    return true;
  }

  closeFile(fileId: string): void {
    if (!this._openFiles.has(fileId)) {
      return;
    }

    this._openFiles.delete(fileId);
  }

  closedSocket(fileId: string, socketId?: string): void {
    if (socketId) {
      this._openFiles.set(fileId, socketId);
      return;
    }

    this._openFiles.delete(fileId);
  }

  async createFolder(dirpath: string): Promise<void> {
    try {
      const dirname = `${DIR_NAME_TEMPLATE}-${uuidv4().substring(0, 8)}`;
      const fullPath = path.join(this.rootPath, dirpath, dirname);

      await mkdir(fullPath);
    } catch (err: unknown) {
      throw "Couldn't create folder";
    }
  }

  async renameFile(oldPath: string, newPath: string): Promise<void> {
    if (fs.existsSync(newPath)) {
      throw 'File already exists';
    }

    await rename(oldPath, newPath);

    const newHash = createHash('sha1').update(newPath).digest('base64');
    const oldHash = createHash('sha1').update(oldPath).digest('base64');
    const socketId = this._openFiles.get(oldHash);
    this._openFiles.delete(oldHash);

    if (socketId) {
      this.openFile(newHash, socketId);
    }
  }

  async deleteFiles(treeFiles: { path: string }[]): Promise<void> {
    try {
      for (let tree of treeFiles) {
        await rm(tree.path, { recursive: true, force: true });
      }
    } catch (err: unknown) {
      throw "Couldn't delete all files";
    }
  }

  private idCallback: DirectoryTreeCallback = (
    item: DirectoryTree & { id?: string; active?: boolean },
    path: string
  ) => {
    item.id = createHash('sha1').update(path).digest('base64');
    item.active = this._openFiles.has(item.id);
  };
}
