import { faker } from '@faker-js/faker/locale/ru';
import type { Database } from '../../database';
import type { ImageTableEntity } from './ImageTable.entity';

export interface ImageTable {
  key: ImageTableEntity['id'];
  value: ImageTableEntity;
}

export function initImageTable(options: {
  database: Database<{
    image: ImageTable;
  }>;
  entitiesWithImages: Array<{
    image_id?: ImageTableEntity['id'];
  }>;
}) {
  const { database, entitiesWithImages } = options;

  let id = 0;
  const images: ImageTableEntity[] = [];

  entitiesWithImages.forEach((entity) => {
    const imageUri = faker.image.dataUri({
      type: 'svg-base64',
      height: 200,
      width: 200,
    });
    const blob = base64ToBlob(imageUri);
    const image: ImageTableEntity = {
      id: ++id,
      content: new File([blob], '', { type: 'image/svg+xml' }),
    };
    images.push(image);
    entity.image_id = image.id;
  });

  return {
    saveImages: () => {
      images.forEach((image) => {
        void database.image.insert(image.id, image);
      });
    },
  };
}

function base64ToBlob(base64String: string) {
  // Remove the data URL prefix if present
  const base64Data = base64String.split(',')[1] || base64String;
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'image/svg+xml' });
}
