import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { UserRecipeLikesTableEntity } from '../../fake-database/tables/UserRecipeLikesTable.entity';
import type { UserRecipeLikeDto } from '../dto/UserRecipeLikeDto';
import type { UserApi } from '../real/UserApi';
import { fakeResponse } from './fakeResponse';

export const fakeUserApi: Partial<UserApi> = {
  getUserRecipeLikes: async (userId, recipeIds) => {
    const database = await getFakeDatabase();

    const user = await database.user.get(userId);
    if (!user) {
      return fakeResponse.notFound('user is not found');
    }

    const likes = await database.userRecipeLikes.getAll();

    let userLikes = likes.filter((like) => like.user_id === userId);

    if (recipeIds) {
      const recipeIdsSet = new Set(recipeIds);
      userLikes = userLikes.filter((like) => recipeIdsSet.has(like.recipe_id));
    }

    return fakeResponse.ok<UserRecipeLikeDto[]>(
      userLikes.map((like) => ({
        user_id: like.user_id,
        recipe_id: like.recipe_id,
        status: like.status,
      }))
    );
  },

  likeRecipe: async (userId, recipeId) => {
    const database = await getFakeDatabase();

    const user = await database.user.get(userId);
    if (!user) {
      return fakeResponse.notFound('user is not found');
    }

    const authorizedUserId = await database.activeAuth.get('authorizedUserId');
    if (user.id !== authorizedUserId) {
      return fakeResponse.forbidden();
    }

    const likeId = `${userId}/${recipeId}` as const;
    const existedLike = await database.userRecipeLikes.get(likeId);

    const like: UserRecipeLikesTableEntity = {
      id: likeId,
      user_id: userId,
      recipe_id: recipeId,
      status: 'like',
    };

    if (!existedLike) {
      await database.userRecipeLikes.insert(likeId, like);
    } else {
      await database.userRecipeLikes.update(likeId, like);
    }

    return fakeResponse.noContent();
  },

  dislikeRecipe: async (userId, recipeId) => {
    const database = await getFakeDatabase();

    const user = await database.user.get(userId);
    if (!user) {
      return fakeResponse.notFound('user is not found');
    }

    const authorizedUserId = await database.activeAuth.get('authorizedUserId');
    if (user.id !== authorizedUserId) {
      return fakeResponse.forbidden();
    }

    const likeId = `${userId}/${recipeId}` as const;
    const existedLike = await database.userRecipeLikes.get(likeId);

    const like: UserRecipeLikesTableEntity = {
      id: likeId,
      user_id: userId,
      recipe_id: recipeId,
      status: 'dislike',
    };

    if (!existedLike) {
      await database.userRecipeLikes.insert(likeId, like);
    } else {
      await database.userRecipeLikes.update(likeId, like);
    }

    return fakeResponse.noContent();
  },

  unlikeRecipe: async (userId, recipeId) => {
    const database = await getFakeDatabase();

    const user = await database.user.get(userId);
    if (!user) {
      return fakeResponse.notFound('user is not found');
    }

    const authorizedUserId = await database.activeAuth.get('authorizedUserId');
    if (user.id !== authorizedUserId) {
      return fakeResponse.forbidden();
    }

    const likeId = `${userId}/${recipeId}` as const;
    await database.userRecipeLikes.delete(likeId);

    return fakeResponse.noContent();
  },
};
