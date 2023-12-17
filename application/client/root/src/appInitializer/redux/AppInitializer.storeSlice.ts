import { storeSlice } from 'redux-controller-middleware';

@storeSlice
export class AppInitializerStoreSlice {
  initialized: boolean;

  constructor(store?: AppInitializerStoreSlice) {
    this.initialized = false;
  }
}
