import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { generateResourcesInterfaceFile } from './generateResourcesInterfaceFile';
import { grabResources } from './grabResources';

const srcDirectory = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'src'
);

export async function generateResourcesDefinition() {
  const relativeFilePaths = await glob('./**/i18n/ru.json', {
    cwd: srcDirectory,
  });
  const resources = await grabResources(srcDirectory, relativeFilePaths);

  await generateResourcesInterfaceFile(resources);

  console.log('✅ ✅ ✅ Locale resources are built');
}
