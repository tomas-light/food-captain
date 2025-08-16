import { readFile } from 'fs/promises';
import { getNamespace } from './getNamespace';

export async function grabResources(filePaths: string[]) {
  const resources: Record<string, Record<string, unknown>> = {};
  const readPromises: Promise<{
    slice: string;
    content: string;
  }>[] = [];

  for (const filePath of filePaths) {
    const slice = getNamespace(filePath);

    readPromises.push(
      readFile(filePath, 'utf-8').then((content) => ({
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
