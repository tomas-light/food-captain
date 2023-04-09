import { DeviceStorage } from './DeviceStorage';

const leftBrace = '{';

export class BrowserLocalStorage implements DeviceStorage {
  async set<Value>(key: string, value: Value): Promise<void> {
    let stringValue: string;

    if (typeof value === 'string') {
      const isNotStringifiedString = !value.startsWith(leftBrace);
      if (isNotStringifiedString) {
        stringValue = JSON.stringify(value);
      } else {
        stringValue = value;
      }
    } else {
      stringValue = JSON.stringify(value);
    }

    await localStorage.setItem(key, stringValue);
  }

  async get<Value>(key: string): Promise<Value | null> {
    let value = await localStorage.getItem(key);
    if (value != null) {
      value = JSON.parse(value);
    }
    return value as unknown as Value;
  }

  async remove(key: string): Promise<void> {
    await localStorage.removeItem(key);
  }
}
