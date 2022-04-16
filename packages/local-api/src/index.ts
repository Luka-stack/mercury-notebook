import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import FileService from './gateway/FileService';
import NotebookService from './gateway/NotebokService';
import { Gateway } from './gateway/Gateway';
import { Server } from 'socket.io';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(
  createProxyMiddleware({
    target: 'http://localhost:3000',
    ws: true,
    logLevel: 'debug',
  })
);

const server = createServer(app);
const fileService = new FileService('D:\\Programming\\projects\\Notebooks');
const notebookService = new NotebookService(
  'D:\\Programming\\projects\\Notebooks'
);

const gateway = new Gateway(server, fileService, notebookService);

server.listen(4005, async () => {
  console.log('Server Running');
});
