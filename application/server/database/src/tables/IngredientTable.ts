import { MakePropertiesOptional } from '../utils';
import { IngredientEntity } from '../entities';

export interface IngredientTable {
  allAsync(): Promise<IngredientEntity[]>;

  byIdAsync(id: number): Promise<IngredientEntity | undefined>;

  insertAsync(
    entity: Omit<IngredientEntity, 'id'>
  ): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<IngredientEntity, 'name'>
  ): Promise<IngredientEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
