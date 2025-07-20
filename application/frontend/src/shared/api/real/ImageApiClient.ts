import { ApiBaseClient, ContentType } from './ApiBaseClient';

export class ImageApiClient extends ApiBaseClient {
  getImageUrlById = async (imageId: number) => {
    return this.request<string>({
      method: 'GET',
      url: `/image/${imageId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  addImage = async (imageFile: File) => {
    return this.request<string>({
      method: 'POST',
      url: '/image',
      data: { image: imageFile },
      type: ContentType.FormData,
      responseType: 'json',
    });
  };
}
