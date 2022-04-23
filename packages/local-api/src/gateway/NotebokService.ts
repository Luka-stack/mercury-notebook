import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import { readFile, writeFile } from 'fs/promises';
import { Cell, Chapter } from '../types';

const NOTEBOOK_NAME_TEMPLATE = 'Mercury';

export default class NotebookService {
  constructor(private readonly rootPath: string) {}

  async fetchNotebook(filePath: string): Promise<[string, any]> {
    const fullPath = path.join(this.rootPath, filePath);

    let file;
    let id;

    try {
      file = await readFile(fullPath, { encoding: 'utf-8' });
      id = createHash('sha1').update(fullPath).digest('base64');
    } catch (err: unknown) {
      throw 'Notebook was not found';
    }

    try {
      const fileJSON = JSON.parse(file);
      return [id, fileJSON];
    } catch (err: unknown) {
      throw 'Error while parsing file. Check notebook content';
    }
  }

  async createNotebook(dirpath: string): Promise<string> {
    const filename = `${NOTEBOOK_NAME_TEMPLATE}-${uuidv4().substring(
      0,
      8
    )}.jsnb`;
    const fullPath = path.join(this.rootPath, dirpath, filename);

    try {
      await writeFile(fullPath, JSON.stringify(defaultContent), 'utf-8');
      return filename;
    } catch (err: unknown) {
      throw 'Error while creating notebook';
    }
  }

  async saveNotebook(
    dirpath: string,
    content: { chapters: Chapter[]; cells: Cell[] },
    isNew: boolean
  ): Promise<string> {
    const fullPath = path.join(this.rootPath, dirpath);

    if (isNew && fs.existsSync(fullPath)) {
      throw 'File already exists';
    }

    try {
      await writeFile(fullPath, JSON.stringify(content), 'utf-8');
      return createHash('sha1').update(fullPath).digest('base64');
    } catch (err: unknown) {
      throw 'Error while saving notebook';
    }
  }
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
