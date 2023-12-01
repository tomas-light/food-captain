import { Container } from 'cheap-di';
import { BrowserLocalStorage, DeviceStorage } from '@food-captain/client-utils';

export function registerControllerDependencies(container: Container) {
  container.registerImplementation(BrowserLocalStorage).as(DeviceStorage);
}
