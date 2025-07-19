import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import readableClassnames from 'vite-plugin-readable-classnames';
import tsconfigPaths from 'vite-tsconfig-paths';
import { readCertificates } from './readCertificates';
import { writeEnvFile } from './writeEnvFile';

export const paths = {
  __dirname: path.dirname(fileURLToPath(import.meta.url)),
  get distDirectory() {
    return path.join(this.__dirname, 'build');
  },
  font(fontFileName: string) {
    return path.join(this.__dirname, 'public', 'fonts', fontFileName);
  },
};

export default defineConfig(async ({ mode, isPreview }) => {
  let foodCaptain_host: string | undefined;
  let foodCaptain_port: number | undefined;

  // to speed up local test runs
  const isUnitTestsRun = mode === 'test' && !process.env.CI;
  if (process.env.CI || (!isUnitTestsRun && !isPreview)) {
    const env = await writeEnvFile();
    ({ foodCaptain_host, foodCaptain_port } = env);
  }

  return {
    plugins: [
      react({
        babel: {
          /** support for import assertions
           * @example
           * import myJson from './my.json' with { type: 'json' };
           * */
          plugins: ['@babel/plugin-syntax-import-attributes'],
        },
      }),
      mode === 'test' ? null : readableClassnames(),
      tsconfigPaths(),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: {
        ...fontAliases,
      },
    },
    build: {
      target: 'esnext',

      outDir: paths.distDirectory,
      sourcemap: true,
      cssMinify: false,
      minify: false,
    },
    server: {
      host: foodCaptain_host ?? 'localhost',
      port: foodCaptain_port ?? 80,

      https: await readCertificates(),
      // Add empty proxy config here to force using http1 instead of http2 in vite
      // to avoid failures: https://github.com/vitejs/vite/discussions/15987 .
      // https setting enables http2 by default, but can be downgraded to http1 by setting proxy (https://vitejs.dev/config/server-options.html#server-https)
      proxy: {},
    },
    test: {
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/tests/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  } as UserConfig;
});

/** add aliases for font resources to include them into build pipeline (see /public/fonts/fonts.scss) */
const fontAliases = {
  ...[].reduce(
    makeFontPathReducer((fontFileName) => paths.font(fontFileName)),
    {} as Record<string, string>
  ),
};

/**
 * @example
 * ['MyFont.woff2'].reduce(
 *   makeFontPathReducer((fontFileName) => paths.font(fontFileName)),
 *   {} as Record<string, string>
 * ),
 * // result is
 * {
 *   '@MyFont.woff2': '/public/fonts/MyFont.woff2'
 * }
 * */
function makeFontPathReducer(makePath: (fontFileName: string) => string) {
  return (fontsObject: Record<string, string>, fileName: string) => {
    const alias = '@' + fileName;
    fontsObject[alias] = makePath(fileName);
    return fontsObject;
  };
}
