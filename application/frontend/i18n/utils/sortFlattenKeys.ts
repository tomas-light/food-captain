export function sortFlattenKeys(flatKeys: Record<string, null>) {
  return Object.keys(flatKeys)
    .sort()
    .reduce(
      (newObject, key) => {
        newObject[key] = flatKeys[key];
        return newObject;
      },
      {} as Record<string, null>
    );
}
