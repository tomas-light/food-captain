import { configureStore } from '@reduxjs/toolkit';
import { container } from 'cheap-di';
import {
  AnyAction,
  combineReducers,
  Dispatch,
  Middleware as ReduxMiddleware,
  MiddlewareAPI,
} from 'redux';
import { controllerMiddleware, InferState } from 'redux-controller-middleware';
import {
  DeviceStorage,
  debounce,
  parseState,
  stringifyState,
} from '@food-captain/client-utils';
import { AppInitializerStore } from '~/appInitializer/redux';
import { IngredientStore } from '~/management/ingredient/redux';
import { DishStore } from '~/management/dish/redux';
import { registerControllerDependencies } from '../registerControllerDependencies';
import { IS_DEV_MODE } from '../environment';

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
  return {
    appInitializer: AppInitializerStore.reducer,
    ingredient: IngredientStore.reducer,
    dish: DishStore.reducer,
  };
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
    callback: (state: State) => {
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

  const persistorMiddleware: ReduxMiddleware<Dispatch, State> = (
    api: MiddlewareAPI<Dispatch, State>
  ) => {
    return (next: Dispatch) => {
      return (action: AnyAction) => {
        const state = api.getState();
        saveStateToDevice(state);

        next(action);
      };
    };
  };

  const middleware = controllerMiddleware<State>({
    getContainer: () => container,
  });

  const restoredState: State = {
    appInitializer: new AppInitializerStore(storedState?.appInitializer),
    ingredient: new IngredientStore(storedState?.ingredient),
    dish: new DishStore(storedState?.dish),
  };

  const store = configureStore({
    preloadedState: restoredState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = [persistorMiddleware];

      const defaultMiddleware = getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      });
      middlewares.push(...defaultMiddleware);
      middlewares.push(middleware);

      return middlewares;
    },
  });

  return {
    store,
    container,
    stateType: null as unknown as State, // only for convenient type inference
  };
}
