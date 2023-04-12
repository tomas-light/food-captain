import { Entity } from './Entity';

export interface ImageEntity extends Entity {
  id: number;
  mime_type: string;
  file_name?: string | null;
  tags?: string; // tag arrays joined with ','
  content: Buffer;
}
