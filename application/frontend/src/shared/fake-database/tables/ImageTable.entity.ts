export interface ImageTableEntity {
  id: number;
  mime_type: string;
  file_name?: string | null;
  tags?: string; // tag arrays joined with ','
  content: File;
}