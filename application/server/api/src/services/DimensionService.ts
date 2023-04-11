import { Database, DimensionEntity } from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';

@metadata
export class DimensionService {
  constructor(private readonly db: Database, private readonly logger: Logger) {}

  getAllAsync(...args: Parameters<Database['dimension']['allAsync']>) {
    return this.db.dimension.allAsync(...args);
  }

  async getManyAsync(ids: DimensionEntity['id'][]) {
    if (!ids.length) {
      return [];
    }

    return await this.db.dimension.byIdsAsync(ids);
  }

  getByIdAsync(...args: Parameters<Database['dimension']['byIdAsync']>) {
    return this.db.dimension.byIdAsync(...args);
  }
  deleteByIdAsync(
    ...args: Parameters<Database['dimension']['deleteByIdAsync']>
  ) {
    return this.db.dimension.deleteByIdAsync(...args);
  }

  async addAsync(dimensionWithoutId: Omit<DimensionEntity, 'id'>) {
    const dimension = dimensionWithoutId as DimensionEntity;

    const dimensionId = await this.db.dimension.insertAsync(dimensionWithoutId);
    if (dimensionId == null) {
      this.logger.warning(
        `dimension is not inserted in DB (dimension id is ${dimensionId})`
      );
      return undefined;
    }

    dimension.id = dimensionId;

    return dimension;
  }
}
