import { Radio } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { ImageDto } from '@food-captain/api';
import { ImageApi } from '@food-captain/client-api';
import { Image } from '@food-captain/client-shared';
import classes from './Gallery.module.scss';

type Props = {
  className?: string;
  onImageClick?: (imageId: number, isDoubleClick?: true) => void;
  selectedImageId?: number;
  searchString?: string;
};

const Gallery: FC<Props> = (props) => {
  const { className, onImageClick, searchString, selectedImageId } = props;

  const imageApi = use(ImageApi);

  const [allImageIds, setAllImageIds] = useState<
    Pick<ImageDto, 'id' | 'tags'>[]
  >([]);

  useEffect(() => {
    (async () => {
      const response = await imageApi.getAllIdsAsync();
      if (response.isOk() && response.data) {
        setAllImageIds(response.data);
      }
    })();
  }, []);

  return (
    <div className={clsx(classes.root, className)}>
      {allImageIds
        .filter((image) => {
          if (!searchString) {
            return true;
          }

          return (
            image.tags
              ?.split(',')
              .some((tag) => tag.startsWith(searchString)) ?? true
          );
        })
        .map((image) => (
          <div key={image.id} className={classes.imageCard}>
            <Image
              src={imageApi.makeUrl(image.id)}
              onClick={() => {
                onImageClick?.(image.id);
              }}
              onDoubleClick={() => {
                onImageClick?.(image.id, true);
              }}
            />

            <Radio
              position={'absolute'}
              top={'8px'}
              right={'8px'}
              isChecked={image.id === selectedImageId}
              disabled
            />
          </div>
        ))}
    </div>
  );
};

export { Gallery };
export type { Props as GalleryProps };
