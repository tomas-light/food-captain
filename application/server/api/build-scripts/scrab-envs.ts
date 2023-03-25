scrabEnvs();

async function scrabEnvs() {
  const path = await import('path');
  const dotEnv = await import('dotenv');
  const { writeFile } = await import('fs/promises');

  const config = dotEnv.config({
    // is executing from "food-captain/application/server/api" folder
    path: path.join('envs', '.env.database.local'),
  });

  const fileContent = Object.entries(config.parsed ?? {}).reduce(
    (content, [key, value]) => {
      return content + `export const ${key}: string = '${value}';\n`;
    },
    ''
  );

  await writeFile(
    // is executing from "food-captain/application/server/api" folder
    path.join('src', 'environment.ts'),
    fileContent,
    'utf-8'
  );
}
