import { readdir } from 'fs/promises';

export async function getSubDirectories(directoryPath: string) {
  const folderContent = await readdir(directoryPath, { withFileTypes: true });
  const directories = folderContent.filter((directoryEntry) =>
    directoryEntry.isDirectory()
  );
  const pagesFolderNames = directories.map(
    (directoryEntry) => directoryEntry.name
  );

  return pagesFolderNames;
}
