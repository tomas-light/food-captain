export abstract class DeviceStorage<Keys = string> {
  abstract set<Value>(key: Keys, value: Value): Promise<void>;
  abstract get<Value>(key: Keys): Promise<Value | null>;
  abstract remove(key: Keys): Promise<void>;
}
