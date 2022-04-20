import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import FileService from './gateway/FileService';
import NotebookService from './gateway/NotebokService';
import { Gateway } from './gateway/Gateway';

export const serve = (dir: string, useProxy: boolean) => {
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
    server.listen(7777, resolve).on('error', reject);
  });
};

// const app = express();
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//   })
// );
// app.use(
//   createProxyMiddleware({
//     target: 'http://localhost:3000',
//     ws: true,
//     logLevel: 'debug',
//   })
// );

// const server = createServer(app);
// const fileService = new FileService('D:\\Programming\\projects\\Notebooks');
// const notebookService = new NotebookService(
//   'D:\\Programming\\projects\\Notebooks'
// );

// const gateway = new Gateway(server, fileService, notebookService);

// server.listen(4005, async () => {
//   console.log('Server Running');
// });
