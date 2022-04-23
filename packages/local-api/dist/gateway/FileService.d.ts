import { DirectoryTree } from 'directory-tree';
export default class FileService {
    private readonly rootPath;
    private _openFiles;
    private _scanOptions;
    constructor(rootPath: string);
    scan(): DirectoryTree & {
        id?: string;
        active?: boolean;
    };
    openFile(fileId: string, socketId: string): boolean;
    closeFile(fileId: string): void;
    closedSocket(fileId: string, socketId?: string): void;
    createFolder(dirpath: string): Promise<void>;
    renameFile(oldPath: string, newPath: string): Promise<void>;
    deleteFiles(treeFiles: {
        path: string;
    }[]): Promise<void>;
    private idCallback;
}
