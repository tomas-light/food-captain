import { merge } from 'webpack-merge';
import { makeBaseConfig } from './config.base';
import { paths } from './paths';
import { getEntryPlugin } from './getEntryPlugin';

async function makeProdConfig() {
  const baseConfig = await makeBaseConfig();
  return merge(baseConfig('development'), {
    plugins: [
      ...Object.keys(paths.entries).map((entryName) =>
        getEntryPlugin(paths.clientDist, entryName)
      ),
    ],
    // optimization: {
    //   minimize: true,
    //   chunkIds: 'named',
    // },
  });
}

export default makeProdConfig;
