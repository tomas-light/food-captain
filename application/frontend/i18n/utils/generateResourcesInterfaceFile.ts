import { mkdir, stat, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { flatResourcesKeys } from './flatResourcesKeys';
import type { ResourcesToBuildLocaleInterface } from './ResourcesGenerationTarget';

const directoryPathToGenerateFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  'src',
  'shared',
  'locale',
  '__generated'
);

export async function generateResourcesInterfaceFile(
  resources: ResourcesToBuildLocaleInterface
) {
  try {
    const interfaceBody = flatResourcesKeys(resources);

    const definition =
      'export interface LocaleResources ' +
      JSON.stringify(interfaceBody, null, 2);

    try {
      await stat(directoryPathToGenerateFile);
    } catch {
      await mkdir(directoryPathToGenerateFile, { recursive: true });
    }

    await writeFile(
      path.join(directoryPathToGenerateFile, 'LocaleResources.d.ts'),
      definition
    );
  } catch (error) {
    console.error('Rebuild Locale Files Error:', error);
  }
}
