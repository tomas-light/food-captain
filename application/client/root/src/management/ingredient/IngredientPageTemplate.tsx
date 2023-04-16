import { use } from 'cheap-di-react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Icon,
  Image,
  ImageField,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { Gallery } from '~/Gallery';
import { Ingredient, NewIngredient } from '~/models';
import classes from './IngredientPageTemplate.module.scss';

type Props = {
  ingredient: Ingredient | NewIngredient;
  onNameChanged: (newName: Ingredient['name']) => void;
  onImageChanged: (newImageId: Ingredient['image_id']) => void;
  saveButtonLabelKey: string;
  onSave: () => void;
};

const IngredientPageTemplate: FC<Props> = (props) => {
  const {
    ingredient,
    onNameChanged,
    onImageChanged,
    saveButtonLabelKey,
    onSave,
  } = props;

  const { t } = useTranslation();

  useLocaleResource('ingredient');

  const imageApi = use(ImageApi);

  const [gallerySearch, setGallerySearch] = useState('');

  return (
    <div className={classes.root}>
      <TextField
        className={classes.titleField}
        icon={<Icon variant={'title'} />}
        label={t('ingredient.name')}
        value={ingredient.name ?? ''}
        onChange={onNameChanged}
      />

      <ImageField
        className={classes.imageField}
        label={
          ingredient.image_id
            ? `#${ingredient.image_id.toString()}`
            : t('ingredient.image')
        }
        onChange={async (imageFile) => {
          const response = await imageApi.addAsync(imageFile, ['ingredient']);
          if (response.isFailed() || !response.data) {
            console.warn('image is no uploaded');
            return;
          }

          onImageChanged(response.data!.imageId);
        }}
      />

      <Image
        className={classes.imagePreview}
        src={
          ingredient.image_id
            ? imageApi.makeUrl(ingredient.image_id)
            : undefined
        }
      />

      <Button className={classes.saveButton} onClick={onSave}>
        {t(saveButtonLabelKey)}
      </Button>

      <div className={classes.gallery}>
        <Typography className={classes.galleryTitle}>
          {t('common.gallery')}
        </Typography>

        <TextField
          className={classes.search}
          icon={<Icon variant={'imageSearch'} />}
          label={t('common.imageSearch')}
          value={gallerySearch}
          onChange={setGallerySearch}
          disabled // todo: remove, when filter will be added
        />

        <Gallery
          searchString={gallerySearch}
          onImageClick={onImageChanged}
          selectedImageId={ingredient.image_id}
        />
      </div>
    </div>
  );
};

export { IngredientPageTemplate };
export type { Props as IngredientPageTemplateProps };
