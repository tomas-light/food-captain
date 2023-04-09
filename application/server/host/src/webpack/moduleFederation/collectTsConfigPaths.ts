import { readFile } from 'fs/promises';
import { paths } from '../paths';
import { SharedModuleConfigsMap } from './types';

export async function collectTsConfigPaths(
  pathToFolder: string,
  folderNames: string[],
  modulesMap: SharedModuleConfigsMap
) {
  for await (const folderName of folderNames) {
    const tsConfigPath = paths.join(pathToFolder, folderName, 'tsconfig.json');

    let fileContent: string;
    try {
      fileContent = await readFile(tsConfigPath, 'utf8');
    } catch (error) {
      console.error(`Reading of ${tsConfigPath} failed.\n`, error);
      break;
    }

    const sharedModule = modulesMap.get(folderName);
    if (!sharedModule) {
      console.error(`Module for ${tsConfigPath} not found in map.`);
      break;
    }

    sharedModule.hasPathsInTsConfig = fileContent.indexOf('"paths":') !== -1;
  }
}
