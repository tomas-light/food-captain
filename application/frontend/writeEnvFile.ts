import { writeFile } from 'node:fs/promises';
import process from 'node:process';
import path from 'path';
import { fileURLToPath } from 'url';
import yenv from 'yenv';
import { type Env } from './env.yaml.js';

export const paths = {
  __dirname: path.dirname(fileURLToPath(import.meta.url)),
  get generatedEnvFile() {
    return path.join(this.__dirname, 'src', 'app', 'config', 'env.yaml.json');
  },
  get env() {
    return path.join(this.__dirname, 'env.yaml');
  },
};

export async function writeEnvFile() {
  let env: Env;

  try {
    env = yenv(paths.env, { logBeforeThrow: true, strict: false });
  } catch {
    /* eslint-disable */
    console.error('[env] Is there env.yaml file?');
    console.group('[env] user environment:');
    console.info(process.env);
    console.groupEnd();
    /* eslint-enable */

    env = {};
  }

  const generatedEnvContent = JSON.stringify(
    {
      configJsonUrl: env.configJsonUrl,
    },
    null,
    2
  );

  await writeFile(paths.generatedEnvFile, generatedEnvContent, 'utf8');

  return env;
}
