import path from 'path';
import express from 'express';
import directoryTree from 'directory-tree';

export const createTreesRouter = (root: string) => {
  const router = express.Router();
  router.use(express.json());

  router.post('/trees/partial', async (req, res) => {
    const { filepath }: { filepath: string } = req.body;
    const fullPath = path.join(root, filepath);

    res.send(
      directoryTree(fullPath, {
        extensions: /\.js$/,
        depth: 1,
        attributes: ['type', 'mtime'],
      })
    );
  });

  router.post('/trees/whole', async (req, res) => {
    res.send(
      directoryTree(root, { extensions: /\.js$/, attributes: ['type'] })
    );
  });

  return router;
};
