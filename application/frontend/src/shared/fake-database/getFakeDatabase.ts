import type { FakeDatabase } from './FakeDatabase';
import { createFakeDatabase } from './createFakeDatabase';

let fakeDatabase: FakeDatabase | undefined;

export async function getFakeDatabase() {
  if (!fakeDatabase) {
    fakeDatabase = await createFakeDatabase();
  }
  return fakeDatabase;
}
