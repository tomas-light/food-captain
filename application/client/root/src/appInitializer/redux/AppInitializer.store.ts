import { storeSlice } from 'redux-controller-middleware';

@storeSlice
export class AppInitializerStore {
  initialized: boolean;

  constructor(store?: AppInitializerStore) {
    this.initialized = false;
  }
}
