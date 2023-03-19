import { DimensionEntity } from './entities';

export interface DimensionTable {
  allAsync(): Promise<DimensionEntity[]>;

  byIdAsync(id: number): Promise<DimensionEntity | undefined>;

  insertAsync(entity: Omit<DimensionEntity, 'id'>): Promise<number | undefined>;

  updateAsync(entity: DimensionEntity): Promise<DimensionEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
