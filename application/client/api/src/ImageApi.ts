import { API_BASE_URL } from './base/API_BASE_URL';
import { ApiBase } from './base/ApiBase';

export class ImageApi extends ApiBase {
  static makeUrl(imageId: number | undefined) {
    return `${API_BASE_URL}/image/${imageId}`;
  }

  // todo: should it be binary?
  async addAsync(imageBase64: string) {
    return await this.post<{ imageId: number }>('/image', imageBase64);
  }

  async deleteAsync(imageId: number) {
    return await this.delete<{ removed: boolean }>(`/image/${imageId}`);
  }
}
