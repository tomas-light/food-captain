import { watchFile, unwatchFile } from 'fs';
import { readFile } from 'fs/promises';
import { findFilePaths } from './utils/findFilePaths';
import { getNamespace } from './utils/getNamespace';
import { flatResourcesKeys } from './utils/flatResourcesKeys';
import { writeInterface } from './utils/writeInterface';
import { srcRegex } from './utils/regexes';
import { sortFlattenKeys } from './utils/sortFlattenKeys';

void generateResourcesDefinitionContinuously();

async function generateResourcesDefinitionContinuously() {
  const filePaths = await findFilePaths();
  const watchedFilePathsSet = new Set<string>();
  const filesResources = new Map<string, Record<string, null>>();

  const promises: Promise<unknown>[] = [];

  for (const filePath of filePaths) {
    if (!watchedFilePathsSet.has(filePath)) {
      addFileWatcher(filePath);

      promises.push(
        (async () => {
          const fileResources = await grabFileResource(filePath);
          if (fileResources) {
            filesResources.set(filePath, fileResources);
          }
        })()
      );
    }
  }

  await Promise.all(promises);

  await writeResourcesIntoInterface();
  console.log('✅ ✅ ✅ Locale resources are built');

  let updateTimer: undefined | ReturnType<typeof setTimeout> = undefined;

  schedule(async function () {
    const filePaths = await findFilePaths();
    for (const filePath of filePaths) {
      if (!watchedFilePathsSet.has(filePath)) {
        addFileWatcher(filePath);
      }
    }

    const filePathsSet = new Set(filePaths);
    for (const filePath of watchedFilePathsSet) {
      if (!filePathsSet.has(filePath)) {
        deleteFileWathcer(filePath);
      }
    }
  });

  function addFileWatcher(filePath: string) {
    watchedFilePathsSet.add(filePath);

    watchFile(filePath, async (current, previous) => {
      if (current.mtimeMs !== previous.mtimeMs) {
        console.log(`✏️  ${filePath.replace(srcRegex, '')} modified`);

        const fileResources = await grabFileResource(filePath);
        if (fileResources) {
          filesResources.set(filePath, fileResources);
          scheduleUpdate();
        }
      }
    });
  }

  function deleteFileWathcer(filePath: string) {
    console.log(`🪣  ${filePath.replace(srcRegex, '')} deleted`);
    watchedFilePathsSet.delete(filePath);
    unwatchFile(filePath);
  }

  function scheduleUpdate() {
    if (updateTimer) {
      clearTimeout(updateTimer);
    }

    updateTimer = setTimeout(async () => {
      await writeResourcesIntoInterface();
      console.log('♻️  ♻️  ♻️  Locale resources are re-built');

      updateTimer = undefined;
    }, 100);
  }

  async function writeResourcesIntoInterface() {
    const resources = Array.from(filesResources.values()).reduce(
      (all, fileResource) => ({
        ...all,
        ...fileResource,
      }),
      {}
    );

    const sortedResources = sortFlattenKeys(resources);
    await writeInterface(sortedResources);
  }
}

function schedule(callback: () => Promise<void>) {
  setTimeout(async () => {
    await callback();

    schedule(callback);
  }, 10e3);
}

async function grabFileResource(filePath: string) {
  const slice = getNamespace(filePath);
  const content = await readFile(filePath, 'utf-8');

  try {
    const parsed = JSON.parse(content);
    return flatResourcesKeys({ [slice]: parsed });
  } catch {}
}
