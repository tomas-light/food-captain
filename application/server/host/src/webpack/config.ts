import { merge } from 'webpack-merge';
import { makeBaseConfig } from './config.base';

async function makeProdConfig() {
  const baseConfig = await makeBaseConfig();
  return merge(baseConfig('production'), {
    optimization: {
      minimize: true,
      chunkIds: 'named',
    },
  });
}

export { makeProdConfig };
