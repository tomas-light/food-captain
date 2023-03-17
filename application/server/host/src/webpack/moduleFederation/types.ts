import { container, ResolvePluginInstance } from 'webpack';

const { ModuleFederationPlugin } = container;

type ModuleFederationOptions = ConstructorParameters<
  typeof ModuleFederationPlugin
>[0];

type InferArray<T> = T extends Array<infer Item> ? Item : never;

type SharedModule = {
  sharedConfig: InferArray<ModuleFederationOptions['shared']>;

  // if module has "paths" in its tsconfig.json, so you should add plugin to support them
  typescriptPathAliasesResolvePlugin?: ResolvePluginInstance;
};

type SharedModuleConfigsMap = Map<
  string, // folderName
  {
    moduleName: string;
    hasPathsInTsConfig?: boolean;
  }
>;

export { ModuleFederationPlugin };
export type { SharedModule, SharedModuleConfigsMap };
