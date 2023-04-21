import { NewTagEntity, TagEntity } from '../entities';

export interface TagTable {
  allAsync(): Promise<TagEntity[]>;

  byIdAsync(id: number): Promise<TagEntity | undefined>;
  byIdsAsync(ids: number[]): Promise<TagEntity[]>;

  insertAsync(entity: NewTagEntity): Promise<number | undefined>;
  insertMultipleAsync(entities: NewTagEntity[]): Promise<number[]>;

  updateAsync(entity: TagEntity): Promise<TagEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
