import { createReducer } from 'redux-controller-middleware';

export class AppInitializerStore {
  initialized: boolean;

  constructor(store?: AppInitializerStore) {
    this.initialized = false;
  }

  static update = 'APP_INITIALIZER_update_store';
  static reducer = createReducer(
    new AppInitializerStore(),
    AppInitializerStore.update
  );
}
