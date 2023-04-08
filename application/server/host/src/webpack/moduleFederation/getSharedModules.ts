import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { paths } from '../paths';
import { collectPackageJsonNames } from './collectPackageJsonNames';
import { collectTsConfigPaths } from './collectTsConfigPaths';
import { getSubDirectories } from './getSubDirectories';
import { SharedModule } from './types';

export function getSharedModules() {
  return getSharedModulesForFolder(paths.client);
}

async function getSharedModulesForFolder(pathToFolder: string) {
  let folderNames = await getSubDirectories(pathToFolder);
  folderNames = folderNames.filter((folderName) => folderName !== 'root');

  const modulesMap = await collectPackageJsonNames(pathToFolder, folderNames);
  await collectTsConfigPaths(pathToFolder, folderNames, modulesMap);

  const sharedModules: SharedModule[] = Array.from(modulesMap.entries()).map(
    ([folderName, config]) =>
      makeSharedModule({
        pathToFolder: pathToFolder,
        folderName,
        moduleNameInPackageJson: config.moduleName,
        hasPathsInTsConfig: Boolean(config.hasPathsInTsConfig),
      })
  );

  return sharedModules;
}

function makeSharedModule(params: {
  pathToFolder: string;
  folderName: string;
  moduleNameInPackageJson: string;
  hasPathsInTsConfig: boolean;
}) {
  const {
    moduleNameInPackageJson,
    pathToFolder,
    folderName,
    hasPathsInTsConfig,
  } = params;

  const sharedModule: SharedModule = {
    sharedConfig: {
      [moduleNameInPackageJson]: {
        import: moduleNameInPackageJson,
        requiredVersion: false, // check or not the package version
        singleton: true, // only a single version of the shared module is allowed
      },
    },
  };

  if (hasPathsInTsConfig) {
    sharedModule.typescriptPathAliasesResolvePlugin = new TsconfigPathsPlugin({
      configFile: paths.join(pathToFolder, folderName, 'tsconfig.json'),
      logLevel: 'WARN',
      mainFields: ['browser', 'module', 'main'],
    });
  }

  return sharedModule;
}
