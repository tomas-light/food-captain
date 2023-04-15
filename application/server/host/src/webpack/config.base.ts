import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, ProgressPlugin, ResolvePluginInstance } from 'webpack';
import { merge } from 'webpack-merge';
import { getSharedModules, ModuleFederationPlugin } from './moduleFederation';
import { paths } from './paths';
import { cssRule, tsRule } from './rules';

async function makeBaseConfig() {
  const sharedModules = await getSharedModules();

  return (mode: 'development' | 'production'): Configuration =>
    merge(
      {
        mode,
        devtool: 'source-map',
        output: {
          path: paths.clientDist,
          publicPath: '/',
        },
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          plugins: sharedModules
            .map((module) => module.typescriptPathAliasesResolvePlugin)
            .filter(Boolean) as ResolvePluginInstance[],
        },
        plugins: [
          new ProgressPlugin(),
          new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: paths.join(paths.static, 'css'),
                to: paths.join(paths.clientDist, 'css'),
              },
              {
                from: paths.join(paths.static, 'img'),
                to: paths.join(paths.clientDist, 'img'),
              },
              {
                from: paths.join(paths.static, 'sounds'),
                to: paths.join(paths.clientDist, 'sounds'),
              },
            ],
          }),
          new ModuleFederationPlugin({
            name: 'root',
            shared: [
              {
                react: {
                  import: 'react',
                  requiredVersion: false,
                  singleton: true, // only a single version of the shared module is allowed
                },
              },
              {
                'react-dom': {
                  import: 'react-dom',
                  requiredVersion: false,
                  singleton: true, // only a single version of the shared module is allowed
                },
              },
              ...sharedModules.map((module) => module.sharedConfig),
            ],
          }),
        ],
        // stats: {
        //   errorDetails: true,
        // },
        // performance: {
        //   maxAssetSize: 1024 * 1024 * 10, // 10 MB
        // },
      },
      cssRule(),
      tsRule()
    );
}

export { makeBaseConfig };
