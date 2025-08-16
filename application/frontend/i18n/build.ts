import { findFilePaths } from './utils/findFilePaths';
import { flatResourcesKeys } from './utils/flatResourcesKeys';
import { grabResources } from './utils/grabResources';
import { writeInterface } from './utils/writeInterface';

void generateResourcesDefinition();

async function generateResourcesDefinition() {
  const filePaths = await findFilePaths();
  const resources = await grabResources(filePaths);

  const interfaceBody = flatResourcesKeys(resources);
  await writeInterface(interfaceBody);

  console.log('✅ ✅ ✅ Locale resources are built');
}
