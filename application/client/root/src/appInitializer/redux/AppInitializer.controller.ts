import {
  chainActions,
  controller,
  ControllerBase,
  Middleware,
  reducer,
  updateStoreSlice,
  WatchedController,
} from 'redux-controller-middleware';
import { DeviceStorage } from '@food-captain/client-utils';
import { persistedState, State } from '~/config/redux';
import { AppInitializerStore } from './AppInitializer.store';

@controller
class AppInitializerController extends ControllerBase<State> {
  constructor(
    middleware: Middleware<State>,
    private readonly deviceStorage: DeviceStorage
  ) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<AppInitializerStore>) {
    this.dispatch(updateStoreSlice(AppInitializerStore)(partialStore));
  }

  @reducer
  initialized() {
    setTimeout(() => {
      console.log('AppInitializerController initialized');
      this.updateStore({
        initialized: true,
      });
    }, 300);
  }

  @reducer
  initialize() {
    const initAction = chainActions(
      // AuthorizationController.init(),
      typedController.initializeAfterLogin(),
      typedController.initialized()
    );

    this.dispatch(initAction);
  }

  @reducer
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

  @reducer
  disposed() {
    this.updateStore({
      initialized: false,
    });
  }

  @reducer
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
