import { join } from 'path';

const host = join(__dirname, '..', '..');
const server = join(host, '..');
const application = join(server, '..');
const nodeModules = join(application, '..', 'node_modules');
const client = join(application, 'client');
const clientRoot = join(client, 'root');
const rootSrc = join(clientRoot, 'src');

const paths = {
  clientDist: join(application, 'dist', 'client'),
  clientRoot,
  client,
  clientTsConfig: join(client, 'tsconfig.json'),
  entries: {
    index: join(rootSrc, 'index.ts'),
  },
  host,
  hostEntryPoint: join(host, 'src', 'index.ts'),
  nodeModules,
  serverDist: join(application, 'dist', 'server'),
  static: join(clientRoot, 'static'),
  join: (...paths: string[]) => {
    return join(...paths);
  },
};

export { paths };
