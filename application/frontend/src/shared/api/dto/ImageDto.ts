export interface ImageDto {
  id: number;
  tags?: string; // tag arrays joined with ','
  content: File;
}