import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import { paths } from './paths';
import { cssRule, tsRule } from './rules';

async function makeBaseConfig() {
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
