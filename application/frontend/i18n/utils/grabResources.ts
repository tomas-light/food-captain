import { readFile } from 'fs/promises';
import path from 'path';
import { getNamespace } from './getNamespace';

export async function grabResources(srcDirectoryPath: string, relativeFilePaths: string[]) {
  const resources: Record<string, Record<string, unknown>> = {};
  const readPromises: Promise<{
    slice: string;
    content: string;
  }>[] = [];

  for (const relativeFilePath of relativeFilePaths) {
    const slice = getNamespace(relativeFilePath);

    readPromises.push(
      readFile(path.join(srcDirectoryPath, relativeFilePath), 'utf-8').then((content) => ({
        slice,
        content,
      }))
    );
  }

  const fileContents = await Promise.all(readPromises);

  for (const { slice, content } of fileContents) {
    try {
      resources[slice] = JSON.parse(content);
    } catch (error) {
      console.error('Rebuild Locale Files Error: || JSON Parse Error', error);
    }
  }

  return resources;
}
