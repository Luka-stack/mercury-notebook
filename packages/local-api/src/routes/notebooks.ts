import path from 'path';
import express from 'express';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';

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

export const createNotebooksRouter = (dir: string) => {
  const router = express.Router();
  router.use(express.json());

  router.post('/notebooks/create', async (req, res) => {
    const { filepath }: { filepath: string } = req.body;
    const fullPath = path.join(dir, filepath);

    try {
      await fs.writeFile(fullPath, JSON.stringify(defaultContent), 'utf-8');
      res.send({ status: 'ok' });
    } catch (err: any) {
      throw err;
    }
  });

  router.post('/notebooks/read', async (req, res) => {
    const { filepath }: { filepath: string } = req.body;
    const fullPath = path.join(dir, filepath);

    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      try {
        res.send(JSON.parse(result));
      } catch (err: any) {
        // res.status(400).send({ error: 'Error while parsing file' });
      }
    } catch (err: any) {
      res.status(404).send({ error: 'Not Found' });
      throw err;
    }
  });

  router.post('/notebooks/save', async (req, res) => {
    const { filepath }: { filepath: string } = req.body;
    const data: { chapters: Chapter[]; cells: Cell[] } = req.body;
    const fullPath = path.join(dir, filepath);

    await fs.writeFile(fullPath, JSON.stringify(data), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};

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
