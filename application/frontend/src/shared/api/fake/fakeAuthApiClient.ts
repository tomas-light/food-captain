import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { UserDto } from '../dto/UserDto';
import type { AuthApiClient } from '../real/AuthApiClient';
import { fakeResponse } from './fakeResponse';

export const fakeAuthApiClient: Partial<AuthApiClient> = {
  getMe: async () => {
    const database = await getFakeDatabase();
    const userId = await database.activeAuth.get('authorizedUserId');

    if (userId == null) {
      return fakeResponse.notAuthorized();
    }

    const user = await database.user.get(userId);
    if (!user) {
      return fakeResponse.notAuthorized();
    }

    return fakeResponse.ok<UserDto>({
      id: user.id,
      name: user.name,
      email: user.email,
    });
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

    const hasKey = await database.activeAuth.get('authorizedUserId');
    if (hasKey) {
      await database.activeAuth.update('authorizedUserId', user.id);
    } else {
      await database.activeAuth.insert('authorizedUserId', user.id);
    }

    return fakeResponse.ok();
  },

  logout: async () => {
    const database = await getFakeDatabase();
    await database.activeAuth.delete('authorizedUserId');
    return fakeResponse.ok();
  },
};
