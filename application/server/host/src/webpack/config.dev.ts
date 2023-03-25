import { exec } from 'child_process';
import { Compiler, Configuration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import { makeBaseConfig } from './config.base';
import { getEntryPlugin } from './getEntryPlugin';
import { paths } from './paths';

class RunCaddyPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.environment.tap('MyPlugin', () => {
      // is executing from "food-captain/application/server/host"
      exec('"../../../caddy_windows_amd64.exe" start --config Caddyfile');
    });
    compiler.hooks.shutdown.tap('MyPlugin', () => {
      // is executing from "food-captain/application/server/host"
      exec('"../../../caddy_windows_amd64.exe" stop');
    });
  }
}

async function makeDevConfig() {
  const baseConfig = await makeBaseConfig();

  const entriesWithHotMiddleware = Object.entries(paths.entries).reduce(
    (entries, [entryName, entryPath]) => {
      entries[entryName] = [
        entryPath,
        // connects to the server to receive notifications when the bundle rebuilds and then updates your client bundle accordingly.
        'webpack-hot-middleware/client',
      ];
      return entries;
    },
    {} as {
      [entryName: string]: string | string[];
    }
  );

  return merge<Configuration & { devServer?: DevServerConfiguration }>(
    baseConfig('development'),
    {
      entry: entriesWithHotMiddleware,
      devServer: {
        static: paths.clientDist,

        // Dev server client for web socket transport, hot and live reload logic
        // disabled, because we configured them manually (in 'entry' above)
        hot: false,
        client: false,
      },
      plugins: [
        new HotModuleReplacementPlugin(),
        new RunCaddyPlugin(),
        ...Object.keys(paths.entries).map((entryName) =>
          getEntryPlugin(paths.clientDist, entryName)
        ),
      ],
    }
  );
}

export { makeDevConfig };
