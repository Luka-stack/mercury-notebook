import { Cell, Chapter } from '../types';
export default class NotebookService {
    private readonly rootPath;
    constructor(rootPath: string);
    fetchNotebook(filePath: string): Promise<[string, any]>;
    createNotebook(dirpath: string): Promise<string>;
    saveNotebook(dirpath: string, content: {
        chapters: Chapter[];
        cells: Cell[];
    }, isNew: boolean): Promise<string>;
}
