import { readFile } from 'fs/promises';
import { join } from 'path';
import { SharedModuleConfigsMap } from './types';

export async function collectPackageJsonNames(
  pathToFolder: string,
  folderNames: string[]
): Promise<SharedModuleConfigsMap> {
  const modulesMap: SharedModuleConfigsMap = new Map();

  for await (const folderName of folderNames) {
    const packageJsonPath = join(pathToFolder, folderName, 'package.json');

    let fileContent: string;
    try {
      fileContent = await readFile(packageJsonPath, 'utf8');
    } catch (error) {
      console.error(`Reading of ${packageJsonPath} failed.\n`, error);
      break;
    }

    let packageJson: { name: string };
    try {
      packageJson = JSON.parse(fileContent);
    } catch (error) {
      console.error(
        `Parsing of ${packageJsonPath} failed. Content:\n\n`,
        fileContent,
        '\n\n Error: \n',
        error
      );
      break;
    }

    modulesMap.set(folderName, { moduleName: packageJson.name });
  }

  return modulesMap;
}
