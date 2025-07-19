export function flatResourcesKeys(resources: object, path?: string) {
  const flatKeys: Record<string, null> = {};

  const prefix = path == null ? '' : `${path}.`;

  for (const [key, value] of Object.entries(resources)) {
    if (typeof value === 'object') {
      const nestedKeys = flatResourcesKeys(value, `${prefix}${key}`);
      Object.assign(flatKeys, nestedKeys);
    } else {
      const sanitizedKey = removePlural(key);
      flatKeys[`${prefix}${sanitizedKey}`] = null;
    }
  }

  return Object.keys(flatKeys)
    .sort()
    .reduce(
      (newObject, key) => {
        newObject[key] = flatKeys[key];
        return newObject;
      },
      {} as Record<string, unknown>
    );
}

const pluralSuffixes = ['_zero', '_one', '_two', '_few', '_many', '_other'];
function removePlural(key: string) {
  for (const suffix of pluralSuffixes) {
    if (key.endsWith(suffix)) {
      return key.substring(0, key.length - suffix.length);
    }
  }

  return key;
}
