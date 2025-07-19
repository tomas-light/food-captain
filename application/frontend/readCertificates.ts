import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const paths = {
  __dirname: dirname(fileURLToPath(import.meta.url)),
  get localhostCertificates() {
    return join(this.__dirname, 'localhostCertificates');
  },
};

export async function readCertificates() {
  return {
    key: await read('private-key.key'),
    cert: await read('certificate.crt'),
    pfx: await read('certificate.pfx'),
  };

  async function read(fileName: string) {
    const pathToFile = join(paths.localhostCertificates, fileName);
    return await readFile(pathToFile);
  }
}
