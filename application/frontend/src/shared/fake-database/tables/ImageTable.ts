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
    const image: ImageTableEntity = {
      id: ++id,
      content: new File([imageUri], '', { type: 'image/svg+xml' }),
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
