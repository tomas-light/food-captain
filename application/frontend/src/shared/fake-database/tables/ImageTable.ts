import type { Database } from '../../database';
import { image_1 } from './imageBinaries/1';
import { image_11 } from './imageBinaries/11';
import { image_12 } from './imageBinaries/12';
import { image_13 } from './imageBinaries/13';
import { image_14 } from './imageBinaries/14';
import { image_15 } from './imageBinaries/15';
import { image_16 } from './imageBinaries/16';
import { image_17 } from './imageBinaries/17';
import { image_18 } from './imageBinaries/18';
import { image_19 } from './imageBinaries/19';
import { image_2 } from './imageBinaries/2';
import { image_20 } from './imageBinaries/20';
import { image_21 } from './imageBinaries/21';
import { image_22 } from './imageBinaries/22';
import { image_23 } from './imageBinaries/23';
import { image_6 } from './imageBinaries/6';
import { image_7 } from './imageBinaries/7';
import { image_8 } from './imageBinaries/8';
import { image_9 } from './imageBinaries/9';
import { image_10 } from './imageBinaries/10';
import type { ImageTableEntity } from './ImageTable.entity';

export interface ImageTable {
  key: ImageTableEntity['id'];
  value: ImageTableEntity;
}

export function initImageTable(options: {
  database: Database<{
    image: ImageTable;
  }>;
}) {
  const { database } = options;

  const images: ImageTableEntity[] = [
    create(
      1,
      new File([image_1], 'лук.jpg'),
      'лук.jpg',
      'image/jpeg',
      'ingredient'
    ),
    create(2, image_2, 'ÑÐµÑÐ½Ð¾Ðº.jpg', 'image/jpeg', 'ingredient'),
    create(6, image_6, 'image from buffer.png', 'image/png', 'ingredient'),
    create(7, image_7, 'image from buffer.png', 'image/png', 'ingredient'),
    create(8, image_8, 'image from buffer.png', 'image/png', 'ingredient'),
    create(9, image_9, 'image from buffer.png', 'image/png', 'ingredient'),
    create(10, image_10, 'image from buffer.png', 'image/png', 'ingredient'),
    create(11, image_11, 'image from buffer.png', 'image/png', 'ingredient'),
    create(12, image_12, 'image from buffer.png', 'image/png', 'ingredient'),
    create(13, image_13, 'Ð±Ð¾ÑÑ.png', 'image/png', 'recipe'),
    create(14, image_14, 'image from buffer.png', 'image/png', 'ingredient'),
    create(15, image_15, 'image from buffer.png', 'image/png', 'ingredient'),
    create(16, image_16, 'image from buffer.png', 'image/png', 'ingredient'),
    create(17, image_17, 'image from buffer.png', 'image/png', 'ingredient'),
    create(18, image_18, 'image from buffer.png', 'image/png', 'ingredient'),
    create(19, image_19, 'image from buffer.png', 'image/png', 'ingredient'),
    create(20, image_20, 'image from buffer.png', 'image/png', 'ingredient'),
    create(21, image_21, 'image from buffer.png', 'image/png', 'ingredient'),
    create(22, image_22, 'image from buffer.png', 'image/png', 'recipe'),
    create(23, image_23, 'image from buffer.png', 'image/png', 'ingredient'),
  ];

  function create(
    id: ImageTableEntity['id'],
    content: ImageTableEntity['content'],
    file_name: ImageTableEntity['file_name'],
    mime_type: ImageTableEntity['mime_type'],
    tags: ImageTableEntity['tags']
  ): ImageTableEntity {
    return {
      id,
      mime_type,
      file_name,
      tags,
      content,
    };
  }

  return {
    saveImages: () => {
      images.forEach((image) => {
        void database.image.insert(image.id, image);
      });
    },
  };
}
