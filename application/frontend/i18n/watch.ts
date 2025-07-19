import { generateResourcesDefinition } from './utils/generateResourcesDefinition';

void generateResourcesDefinitionContinuously();

async function generateResourcesDefinitionContinuously() {
  schedule(generateResourcesDefinition);
}

function schedule(callback: () => Promise<void>) {
  setTimeout(async () => {
    await callback();

    schedule(callback);
  }, 10e3);
}
