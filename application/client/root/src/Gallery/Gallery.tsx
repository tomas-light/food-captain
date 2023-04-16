import { Checkbox } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import { FC, useEffect, useState } from 'react';
import { ImageApi } from '@food-captain/client-api';
import { Image } from '@food-captain/client-shared';
import classes from './Gallery.module.scss';

type Props = {
  onImageClick?: (imageId: number) => void;
  selectedImageId?: number;
  searchString?: string;
};

const Gallery: FC<Props> = (props) => {
  const { onImageClick, searchString, selectedImageId } = props;

  const imageApi = use(ImageApi);

  const [allImageIds, setAllImageIds] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const response = await imageApi.getAllIdsAsync();
      if (response.isOk() && response.data) {
        setAllImageIds(response.data.imageIds);
      }
    })();
  }, []);

  return (
    <div className={classes.root}>
      {allImageIds
        .filter((image) => {
          if (!searchString) {
            return true;
          }

          // todo: load image id with tags ?
          // return image.tags?.split(',').some((tag) => tag.startsWith(searchString)) ?? true;
          return true;
        })
        .map((imageId) => (
          <div key={imageId} className={classes.imageCard}>
            <Image
              src={imageApi.makeUrl(imageId)}
              onClick={() => {
                onImageClick?.(imageId);
              }}
            />

            <Checkbox
              className={classes.imageCheckbox}
              position={'absolute'}
              isChecked={imageId === selectedImageId}
              disabled
            />
          </div>
        ))}
    </div>
  );
};

export { Gallery };
export type { Props as GalleryProps };
