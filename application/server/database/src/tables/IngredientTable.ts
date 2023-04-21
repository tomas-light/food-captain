import { MakePropertiesOptional } from '../utils';
import { IngredientEntity, NewIngredientEntity } from '../entities';

export interface IngredientTable {
  allAsync(): Promise<IngredientEntity[]>;

  byIdAsync(id: number): Promise<IngredientEntity | undefined>;
  byIdsAsync(ids: number[]): Promise<IngredientEntity[]>;

  insertAsync(entity: NewIngredientEntity): Promise<number | undefined>;
  insertMultipleAsync(entities: NewIngredientEntity[]): Promise<number[]>;

  updateAsync(
    entity: MakePropertiesOptional<IngredientEntity, 'name'>
  ): Promise<IngredientEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
