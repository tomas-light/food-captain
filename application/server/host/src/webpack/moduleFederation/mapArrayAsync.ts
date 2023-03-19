export function mapArrayAsync<Item>(
  array: Item[],
  mapFunction: (value: Item) => Promise<void>
) {
  const generator = array.values();
  let handledArrayItems = 0;
  const { length } = array;

  return new Promise<void>((resolve) => {
    let iterator: IteratorResult<Item, Item>;
    do {
      iterator = generator.next();

      if (!iterator.done) {
        mapFunction(iterator.value).then(() => {
          if (++handledArrayItems >= length) {
            resolve();
          }
        });
      }
    } while (!iterator.done);

    resolve();
  });
}
