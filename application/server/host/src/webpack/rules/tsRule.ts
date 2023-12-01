import { transformer } from 'cheap-di-ts-transform';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Program } from 'typescript';
import { Configuration } from 'webpack';
import { paths } from '../paths';

export function tsRule(): Configuration {
  return {
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          // The equivalent of the --build flag for the tsc command -> build project
          // and all its dependencies in project references.
          build: true,

          configFile: paths.clientTsConfig,
          mode: 'readonly', // don't write tsbuildinfo and d.ts on a disk,
        },
      }),
    ],
    module: {
      rules: [
        {
          loader: 'ts-loader',
          test: /\.tsx?$/,
          exclude: /\.test\.tsx?$/,
          options: {
            getCustomTransformers: (program: Program) => ({
              before: [transformer({ program })],
            }),
          },
        },
      ],
    },
  };
}
