scrabEnvs();

async function scrabEnvs() {
  const path = await import('path');
  const { writeFile } = await import('fs/promises');

  const apiVariables = await readHostEnvContent();

  await writeFile(
    // is executing from "food-captain/application/server/host" folder
    path.join('src', 'environment.ts'),
    apiVariables,
    'utf-8'
  );
}

async function readHostEnvContent() {
  const path = await import('path');

  // is executing from "food-captain/application/server/host" folder
  const pathToEnvFile = path.join('envs', '.env.local');

  return await readEnvContent(pathToEnvFile);
}

async function readEnvContent(pathToEnvFile: string) {
  const dotEnv = await import('dotenv');

  const config = dotEnv.config({
    path: pathToEnvFile,
  });

  return Object.entries(config.parsed ?? {}).reduce((content, [key, value]) => {
    return content + `export const ${key}: string = '${value}';\n`;
  }, '');
}
