import { api, GET, POST } from 'mvc-middleware/stage2';
import { BaseApiController } from '../base/BaseApiController';

@api
export default class CheckApiController extends BaseApiController {
  @GET
  async check() {
    return this.noContent();
  }

  @POST
  async createUser(payload: { username: string }) {
    const { username } = payload;
    return this.ok(username);
  }
}
