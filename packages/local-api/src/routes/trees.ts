import path from 'path';
import fs from 'fs/promises';
import express from 'express';
import directoryTree, {
  DirectoryTree,
  DirectoryTreeCallback,
} from 'directory-tree';

import { createHash } from 'crypto';

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

  router.post('/trees/folder', async (req, res) => {
    const { dirpath }: { dirpath: string } = req.body;
    const fullPath = path.join(root, dirpath);

    try {
      await fs.mkdir(fullPath);
      res.send({ status: 'ok' });
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  });

  router.post('/test', async (req, res) => {
    // 'D:\\Programming\\projects\\Notebooks\\tester.txt',

    const callback: DirectoryTreeCallback = (
      item: DirectoryTree & { id?: string },
      path: string
    ) => {
      item.id = createHash('sha1').update(path).digest('base64');
    };

    const tree: DirectoryTree & { id?: string } = directoryTree(
      root,
      {
        extensions: /\.js$/,
        depth: 1,
        attributes: ['type', 'mtime'],
      },
      callback,
      callback
    );

    res.send(tree);
  });

  return router;
};
