import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createNotebooksRouter } from './routes/notebooks';
import { createTreesRouter } from './routes/trees';
import cors from 'cors';

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

app.listen(4005, async () => {
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
