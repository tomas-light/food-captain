import { configureStore } from '@reduxjs/toolkit';
import { container } from 'cheap-di';
import {
  combineReducers,
  Dispatch,
  Middleware as ReduxMiddleware,
  MiddlewareAPI,
} from 'redux';
import {
  controllerMiddleware,
  getReducersFromStoreSlices,
  InferState,
} from 'redux-controller-middleware';
import {
  debounce,
  DeviceStorage,
  parseState,
  stringifyState,
} from '@food-captain/client-utils';
import { registerControllerDependencies } from '../registerControllerDependencies';
import { IS_DEV_MODE } from '../environment';
import { AppInitializerStoreSlice } from '../../appInitializer/redux/index';
import { IngredientStoreSlice } from '../../management/ingredient/redux/index';
import { RecipeStoreSlice } from '../../management/recipe/redux/index';

const APPLICATION_STATE_VERSION = '1';

// enable parsing of 'Map' structure in the store for Redux Dev Tools
if (IS_DEV_MODE) {
  (Map.prototype as any).toJSON = function () {
    const mapObject: any = {};

    this.forEach((value: any, key: any) => {
      mapObject[key] = value;
    });

    return mapObject;
  };
}

export const persistedState = {
  key: 'Food_Captain_state',
  versionKey: 'Food_Captain_state_version',
};

function makeReducers() {
  return getReducersFromStoreSlices({
    appInitializer: AppInitializerStoreSlice,
    ingredient: IngredientStoreSlice,
    recipe: RecipeStoreSlice,
  });
}

export type State = InferState<ReturnType<typeof makeReducers>>;

export async function configureRedux() {
  const rootReducer = combineReducers(makeReducers());

  registerControllerDependencies(container);

  const deviceStorage = container.resolve(
    DeviceStorage<typeof persistedState.key | typeof persistedState.versionKey>
  );
  if (!deviceStorage) {
    throw new Error(
      'Cannot resolve DeviceStorage from DI in configureRedux function'
    );
  }

  const { debouncedCallback: saveStateToDevice } = debounce({
    callback: (api: MiddlewareAPI<Dispatch, State>) => {
      const state = api.getState();
      const preparedState = stringifyState(state);
      const json = JSON.stringify(preparedState);
      deviceStorage.set(persistedState.key, json);
    },
    throttlingInMilliseconds: 300,
  });

  const storedStoreVersion = await deviceStorage.get<string>(
    persistedState.versionKey
  );

  let storedState: State | undefined;
  if (storedStoreVersion === APPLICATION_STATE_VERSION) {
    const parsedJson = await deviceStorage.get<State>(persistedState.key);
    storedState = parseState(parsedJson);
  } else {
    // remove deprecated state
    await deviceStorage.remove(persistedState.key);
  }

  // actualize state version
  await deviceStorage.set(persistedState.versionKey, APPLICATION_STATE_VERSION);

  const persistorMiddleware: ReduxMiddleware<{}, State, Dispatch> = (api) => {
    return (next) => {
      return (action) => {
        saveStateToDevice(api);
        next(action);
      };
    };
  };

  const middleware = controllerMiddleware({ container });

  const restoredState: State = {
    appInitializer: new AppInitializerStoreSlice(storedState?.appInitializer),
    ingredient: new IngredientStoreSlice(storedState?.ingredient),
    recipe: new RecipeStoreSlice(storedState?.recipe),
  };

  const store = configureStore({
    preloadedState: restoredState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(middleware, persistorMiddleware),
  });

  return {
    store,
    container,
    stateType: null as unknown as State, // only for convenient type inference
  };
}
