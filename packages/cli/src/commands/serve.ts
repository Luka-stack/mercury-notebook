import { serve } from '@mercury-notebook/local-api';
import { Command } from 'commander';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve')
  .description('Open a Mercury Notebook Hub')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (options: { port: string }) => {
    try {
      const dir = process.cwd();
      await serve(+options.port, dir, !isProduction);
      console.log(
        `To use Mercury Notebook hub navigate to http://localhost:${options.port}.`
      );
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.log(
          `Port ${options.port} is in use. Try running on a different port.`
        );
      } else {
        console.log('Heres the problem', err.message);
      }
      process.exit(1);
    }
  });
