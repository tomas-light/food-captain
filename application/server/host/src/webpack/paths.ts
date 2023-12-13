import { join } from 'path';

const paths = {
  host: join(__dirname, '..', '..'),
  get server() {
    return join(this.host, '..');
  },
  get application() {
    return join(this.server, '..');
  },
  get nodeModules() {
    return join(this.application, '..', 'node_modules');
  },
  get client() {
    return join(this.application, 'client');
  },
  get clientRoot() {
    return join(this.client, 'root');
  },
  get rootSrc() {
    return join(this.clientRoot, 'src');
  },
  get clientDist() {
    return join(this.application, 'dist', 'client');
  },
  get clientTsConfig() {
    return join(this.client, 'tsconfig.json');
  },
  get entries() {
    return {
      index: join(this.rootSrc, 'index.ts'),
    };
  },
  get hostEntryPoint() {
    return join(this.host, 'src', 'index.ts');
  },
  get serverDist() {
    return join(this.application, 'dist', 'server');
  },
  get static() {
    return join(this.clientRoot, 'static');
  },
  join: (...paths: string[]) => {
    return join(...paths);
  },
};

export { paths };
