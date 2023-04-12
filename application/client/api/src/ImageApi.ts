import { API_BASE_URL } from './base/API_BASE_URL';
import { ApiBase } from './base/ApiBase';

export class ImageApi extends ApiBase {
  static makeUrl(imageId: string | number | undefined) {
    return `${API_BASE_URL}/image/${imageId}`;
  }

  makeUrl = ImageApi.makeUrl;

  // todo: add filter by image type? like get all ingredients images
  async getAllIdsAsync() {
    return await this.get<{
      imageIds: number[];
    }>('/images');
  }

  async addAsync(imageFile: File, imageTags: string[]) {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('tags', imageTags.join(','));
    return await this.post<{ imageId: number }>('/image', formData);
  }

  async deleteAsync(imageId: number) {
    return await this.delete<{ removed: boolean }>(`/image/${imageId}`);
  }
}
