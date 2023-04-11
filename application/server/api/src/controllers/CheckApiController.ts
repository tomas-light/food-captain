import { api, get, post } from 'mvc-middleware';
import BaseApiController from './BaseApiController';

@api
export default class CheckApiController extends BaseApiController {
  @get
  async check() {
    return this.noContent();
  }

  @post
  async createUser(payload: { username: string }) {
    const { username } = payload;
    return this.ok(username);
  }
}
