import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const srcDirectory = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'src'
);

export function findFilePaths() {
  return glob('./**/i18n/ru.json', {
    cwd: srcDirectory,
    absolute: true,
  });
}
