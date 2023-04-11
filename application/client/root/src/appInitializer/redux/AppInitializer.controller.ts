import {
  chainActions,
  ControllerBase,
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import { DeviceStorage } from '@food-captain/client-utils';
import { persistedState, State } from '~/config/redux';
import { AppInitializerStore } from './AppInitializer.store';

@watch
class AppInitializerController extends ControllerBase<State> {
  constructor(
    middleware: Middleware<State>,
    private readonly deviceStorage: DeviceStorage
  ) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<AppInitializerStore>) {
    this.dispatch(createAction(AppInitializerStore.update, partialStore));
  }

  @watch
  initialized() {
    setTimeout(() => {
      console.log('AppInitializerController initialized');
      this.updateStore({
        initialized: true,
      });
    }, 300);
  }

  @watch
  initialize() {
    const initAction = chainActions(
      // AuthorizationController.init(),
      typedController.initializeAfterLogin(),
      typedController.initialized()
    );

    this.dispatch(initAction);
  }

  @watch
  // authorization is required for actions bellow
  initializeAfterLogin() {
    // const { authorizationToken } = this.getState().authorization;
    // const isUserNotAuthorized = !authorizationToken;
    // if (isUserNotAuthorized) {
    //   return;
    // }
    // this.dispatch(
    //   chainActions(
    //     ProfileController.init(),
    //   )
    // );
  }

  @watch
  disposed() {
    this.updateStore({
      initialized: false,
    });
  }

  @watch
  async dispose() {
    await this.deviceStorage.remove(typeof persistedState.key);

    const disposeAction = chainActions(
      // AuthorizationController.dispose(),
      typedController.disposed()
    );

    this.dispatch(disposeAction);
  }
}

const typedController =
  AppInitializerController as unknown as WatchedController<AppInitializerController>;
export { typedController as AppInitializerController };
