import { DimensionDto, NewDimensionDto } from '@food-captain/api';
import { metadata } from '@food-captain/client-utils';
import { ApiBase } from './base/ApiBase';

@metadata
export class DimensionApi extends ApiBase {
  async getAllAsync() {
    return this.get<DimensionDto[]>('/dimensions');
  }

  async getManyAsync(dimensionIds: DimensionDto['id'][]) {
    return this.post<DimensionDto[]>('/dimensions-by-ids', dimensionIds);
  }

  async getByIdAsync(dimensionId: DimensionDto['id']) {
    return this.get<DimensionDto>(`dimension/${dimensionId}`);
  }

  async addAsync(newDimension: NewDimensionDto) {
    return this.post<NewDimensionDto>('dimension', newDimension);
  }

  async deleteAsync(dimensionId: DimensionDto['id']) {
    return this.delete<{ removed: boolean }>(`dimension/${dimensionId}`);
  }
}
