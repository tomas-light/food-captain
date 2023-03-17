import { readFile } from 'fs/promises';
import { paths } from '../paths';
import { mapArrayAsync } from './mapArrayAsync';
import { SharedModuleConfigsMap } from './types';

async function collectTsConfigPaths(
  pathToFolder: string,
  folderNames: string[],
  modulesMap: SharedModuleConfigsMap
) {
  await mapArrayAsync(folderNames, async (folderName) => {
    const tsConfigPath = paths.join(pathToFolder, folderName, 'tsconfig.json');

    let fileContent: string;
    try {
      fileContent = await readFile(tsConfigPath, 'utf8');
    } catch (error) {
      console.error(`Reading of ${tsConfigPath} failed.\n`, error);
      return;
    }

    if (!modulesMap.has(folderName)) {
      console.error(`Module for ${tsConfigPath} not found in map.`);
      return;
    }

    const sharedModule = modulesMap.get(folderName)!;
    sharedModule.hasPathsInTsConfig = fileContent.indexOf('"paths":') !== -1;
  });
}

export { collectTsConfigPaths };
