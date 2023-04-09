import { BrowserLocalStorage, DeviceStorage } from '@food-captain/client-utils';
import { Container } from 'cheap-di';

export function registerControllerDependencies(container: Container) {
  container.registerType(BrowserLocalStorage).as(DeviceStorage);
}
