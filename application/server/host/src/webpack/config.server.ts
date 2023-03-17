import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import { paths } from './paths';
import { tsRule } from './rules';

// makes sure we include node_modules and other 3rd party libraries
const nodeModules: Configuration = {
  resolve: {
    modules: [paths.nodeModules],
  },
  externals: [/node_modules/ /* , 'bufferutil', 'utf-8-validate'*/],
};

const serverConfig: Configuration = merge(
  {
    mode: 'production',
    devtool: false,
    target: 'node',
    context: paths.host,
    entry: paths.hostEntryPoint,
    output: {
      path: paths.serverDist,
      filename: 'index.js',
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    plugins: [new ProgressPlugin(), new CleanWebpackPlugin()],
    optimization: {
      minimize: false,
      splitChunks: false,
      minimizer: undefined,
    },
  },
  nodeModules,
  tsRule()
);

export { serverConfig };
