import dayjs from 'dayjs';
import { create, type UseBoundStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { PersistOptions } from 'zustand/middleware/persist';
import type { Mutate, StoreApi } from 'zustand/vanilla';
import { isSerializedValue } from './SerializedValue';

const storeResetFunctions: VoidFunction[] = [];
export function resetAllStores() {
  storeResetFunctions.forEach((resetFn) => resetFn());
}

export function createStore<InitialState>(
  initialState: InitialState,
  options: Partial<
    Pick<
      PersistOptions<InitialState>,
      'name' | 'version' | 'migrate' | 'partialize'
    >
  > = {}
): UseBoundStore<Mutate<StoreApi<InitialState>, []>> {
  const { name, ...persistOptions } = options;

  if (!name) {
    const store = create(() => initialState);
    storeResetFunctions.push(() => resetStoreState(store, initialState));
    return store;
  }

  const store = create(
    persist(() => initialState, {
      ...persistOptions,
      name: name,
      storage: createJSONStorage(() => localStorage, {
        reviver(_key, value) {
          if (!isSerializedValue(value)) {
            return value;
          }

          if (value.storeType === 'date') {
            return dayjs(value.date);
          }

          if (value.storeType === 'set') {
            return new Set(value.items);
          }

          return value;
        },
        replacer(this: Record<string, unknown>, key, value) {
          // value parameter is already converted to a string, using this to get original value
          const actualValue = this[key];

          if (dayjs.isDayjs(actualValue)) {
            return { storeType: 'date', date: actualValue.toISOString() };
          }

          if (actualValue instanceof Set) {
            return { storeType: 'set', items: Array.from(actualValue) };
          }

          return value;
        },
      }),
    })
  );
  storeResetFunctions.push(() => resetStoreState(store, initialState));
  return store;
}

function resetStoreState<InitialState>(
  store: UseBoundStore<StoreApi<InitialState>>,
  initialState: InitialState
) {
  const storeData = store.getState();
  store.setState(initialState, true);
  const partialStore: Partial<InitialState> = {};
  for (const key in storeData) {
    if (key.startsWith('mock')) {
      partialStore[key] = storeData[key];
    }
  }
  store.setState(() => partialStore);
}
