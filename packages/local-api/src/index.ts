import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import FileService from './gateway/FileService';
import NotebookService from './gateway/NotebokService';
import { Gateway } from './gateway/Gateway';

export const serve = (port: number, dir: string, useProxy: boolean) => {
  const app = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    const packagePath = require.resolve(
      '@mercury-notebook/local-client/build/index.html'
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  const server = createServer(app);
  const fileService = new FileService(dir);
  const notebookService = new NotebookService(dir);

  const gateway = new Gateway(server, fileService, notebookService);

  return new Promise<void>((resolve, reject) => {
    server.listen(port, resolve).on('error', reject);
  });
};
