import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createHash } from 'crypto';
import path from 'path';

import { createTreesRouter } from './routes/trees';
import { createNotebooksRouter } from './routes/notebooks';
import { TreeFile } from './TreeFile';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(createNotebooksRouter('D:\\Programming\\projects\\Notebooks'));
app.use(createTreesRouter('D:\\Programming\\projects\\Notebooks'));

app.use(
  createProxyMiddleware({
    target: 'http://localhost:3000',
    ws: true,
    logLevel: 'debug',
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const treeStore = new TreeFile('D:\\Programming\\projects\\Notebooks', io);

io.on('connection', (socket) => {
  socket.emit('tree', {
    ...treeStore.scan(),
  });

  socket.on('openNotebook', (data) => {
    const fullPath = path.join(
      'D:\\Programming\\projects\\Notebooks',
      data.partialPath
    );
    const id = createHash('sha1').update(fullPath).digest('base64');
    treeStore.openFile(id, socket.id);
  });

  socket.on('closeNotebok', (data) => {
    console.log('on closeNotebook');
    const fullPath = path.join(
      'D:\\Programming\\projects\\Notebooks',
      data.partialPath
    );
    const id = createHash('sha1').update(fullPath).digest('base64');
    treeStore.closeFile(id);
  });

  socket.on('createFolder', ({ crumbPath }) => {
    treeStore.createFolder(crumbPath);
  });

  socket.on('createNotebook', ({ crumbPath }) => {
    treeStore.createNotebook(crumbPath);
  });

  socket.on('disconnect', () => {
    treeStore.closedSocket(socket.id);
  });
});

server.listen(4005, async () => {
  console.log('Server running');
});

// export const serve = (port: number, dir: string, useProxy: boolean) => {
//   const app = express();

//   app.use(createCellsRouter(dir));

//   if (useProxy) {
//     app.use(
//       createProxyMiddleware({
//         target: 'http://localhost:3000',
//         ws: true,
//         logLevel: 'silent',
//       })
//     );
//   } else {
//     const packagePath = require.resolve(
//       '@mercury-notebook/local-client/build/index.html'
//     );
//     app.use(express.static(path.dirname(packagePath)));
//   }

//   return new Promise<void>((resolve, reject) => {
//     app.listen(port, resolve).on('error', reject);
//   });
// };
