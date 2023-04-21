import { Entity } from './Entity';

export interface DimensionEntity extends Entity {
  id: number;
  name: string;
  short_name: string;
}
