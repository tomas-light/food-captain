scrabEnvs();

async function scrabEnvs() {
  const path = await import('path');
  const { writeFile } = await import('fs/promises');

  const apiVariables = await readApiEnvContent();
  const databaseVariables = await readDatabaseEnvContent();

  await writeFile(
    // is executing from "food-captain/application/server/api" folder
    path.join('..', '..', 'client', 'api', 'src', 'environment.ts'),
    apiVariables,
    'utf-8'
  );
  await writeFile(
    // is executing from "food-captain/application/server/api" folder
    path.join('src', 'environment.ts'),
    apiVariables + databaseVariables,
    'utf-8'
  );
}

async function readApiEnvContent() {
  const path = await import('path');

  // is executing from "food-captain/application/server/api" folder
  const apiPathToEnvFile = path.join('envs', '.env.local');
  const apiVariables = await readEnvContent(apiPathToEnvFile);

  const hostPathToEnvFile = path.join('..', 'host', 'envs', '.env.local');
  const hostVariables = await readEnvContent(hostPathToEnvFile);

  return apiVariables + hostVariables;
}

async function readDatabaseEnvContent() {
  const path = await import('path');

  // is executing from "food-captain/application/server/api" folder
  const pathToEnvFile = path.join(
    '..',
    'database',
    'envs',
    '.env.database.local'
  );

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
