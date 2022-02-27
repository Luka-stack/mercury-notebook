import path from 'path';
import express from 'express';
import fs from 'fs/promises';

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

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(fullPath, JSON.stringify(defaultContent), 'utf-8');
        res.send(defaultContent);
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const data: { chapters: Chapter[]; cells: Cell[] } = req.body;

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
