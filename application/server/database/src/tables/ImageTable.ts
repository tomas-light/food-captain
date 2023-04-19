import { ImageEntity } from '../entities';

export interface ImageTable {
  allAsync(): Promise<ImageEntity[]>;
  allShortInfoAsync(): Promise<Pick<ImageEntity, 'id' | 'tags'>[]>;

  byIdAsync(id: number): Promise<ImageEntity | undefined>;

  insertAsync(entity: Omit<ImageEntity, 'id'>): Promise<number | undefined>;

  updateAsync(entity: ImageEntity): Promise<ImageEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
