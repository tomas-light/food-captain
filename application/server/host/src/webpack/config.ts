import { merge } from 'webpack-merge';
import { makeBaseConfig } from './config.base';
import { paths } from './paths';
import { getEntryPlugin } from './getEntryPlugin';

async function makeProdConfig() {
  const baseConfig = await makeBaseConfig();

  const entries = Object.entries(paths.entries).reduce(
    (entries, [entryName, entryPath]) => {
      entries[entryName] = entryPath;
      return entries;
    },
    {} as {
      [entryName: string]: string | string[];
    }
  );

  return merge(baseConfig('development'), {
    entry: entries,
    plugins: [
      ...Object.keys(paths.entries).map((entryName) =>
        getEntryPlugin(paths.clientDist, entryName)
      ),
    ],
    optimization: {
      minimize: false,
      chunkIds: 'named',
    },
  });
}

export default makeProdConfig;
