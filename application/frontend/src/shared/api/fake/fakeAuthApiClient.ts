import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { AuthApiClient } from '../real/AuthApiClient';
import { fakeResponse } from './fakeResponse';

export const fakeAuthApiClient: Partial<AuthApiClient> = {
  isAuthorized: async () => {
    const database = await getFakeDatabase();
    const userEmail = await database.activeAuth.get('authorizedUserEmail');

    if (userEmail == null) {
      return fakeResponse.ok(false);
    }

    const user = await database.user.get(userEmail);
    if (!user) {
      return fakeResponse.ok(false);
    }

    return fakeResponse.ok(true);
  },

  login: async (loginDto) => {
    const database = await getFakeDatabase();
    const users = await database.user.getAll();

    const user = users.find((user) => user.email === loginDto.email);
    if (!user) {
      return fakeResponse.badRequest('Invalid credentials');
    }

    if (user.password !== loginDto.password) {
      return fakeResponse.badRequest('Invalid credentials');
    }

    const hasKey = await database.activeAuth.get('authorizedUserEmail');
    if (hasKey) {
      await database.activeAuth.update('authorizedUserEmail', user.email);
    } else {
      await database.activeAuth.insert('authorizedUserEmail', user.email);
    }

    return fakeResponse.ok();
  },

  logout: async () => {
    const database = await getFakeDatabase();
    await database.activeAuth.delete('authorizedUserEmail');
    return fakeResponse.ok();
  },
};
