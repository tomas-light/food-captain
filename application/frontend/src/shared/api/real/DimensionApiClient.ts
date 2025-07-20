import type { DimensionDto } from '../dto/DimensionDto';
import { ApiBaseClient, ContentType } from './ApiBaseClient';

export class DimensionApiClient extends ApiBaseClient {
  getDimensions = async () => {
    return this.request<DimensionDto[]>({
      method: 'GET',
      url: '/dimensions',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getDimensionsByIds = async (dimensionIds: DimensionDto['id'][]) => {
    // import { DefaultUrlBuilder } from 'nice-web-routes';
    // const builder = new DefaultUrlBuilder();
    // builder.addPathnameIfExists('/dimensions');
    // builder.addSearchParamsIfExists({
    //   dimensionIds: dimensionIds.map((id) => id.toString()),
    // });
    // const url = builder.build();

    return this.request<DimensionDto[]>({
      method: 'GET',
      url: '/dimensions',
      // url: url,
      query: { dimension_ids: dimensionIds },
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getDimensionById = async (dimensionId: DimensionDto['id']) => {
    return this.request<DimensionDto>({
      method: 'GET',
      url: `/dimension/${dimensionId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  addDimension = async (dimension: Omit<DimensionDto, 'id'>) => {
    return this.request<DimensionDto>({
      method: 'POST',
      url: '/dimension',
      data: JSON.stringify(dimension),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  deleteDimension = async (dimensionId: DimensionDto['id']) => {
    return this.request<boolean>({
      method: 'DELETE',
      url: `/dimension/${dimensionId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };
}
