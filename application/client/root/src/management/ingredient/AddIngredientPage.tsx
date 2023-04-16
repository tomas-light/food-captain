import { Checkbox } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Icon,
  ImageField,
  TextField,
  Typography,
  Image,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { NewIngredient } from '~/models';
import { appUrls } from '~/routing';
import { IngredientController } from './redux/Ingredient.controller';
import classes from './AddIngredientPage.module.scss';

const AddIngredientPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLocaleResource('ingredient');

  const imageApi = use(ImageApi);

  const [ingredient, setIngredient] = useState<NewIngredient>({
    name: '',
  });

  const [gallerySearch, setGallerySearch] = useState('');

  const [allImageIds, setAllImageIds] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const response = await imageApi.getAllIdsAsync();
      if (response.isOk() && response.data) {
        setAllImageIds(response.data.imageIds);
      }
    })();
  }, []);

  const add = () => {
    dispatch(
      IngredientController.addIngredient({
        ingredient,
        callback: () => navigate(appUrls.management.ingredient.url()),
      })
    );
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.titleField}
        icon={<Icon variant={'title'} />}
        label={t('ingredient.name')}
        value={ingredient.name ?? ''}
        onChange={(value) =>
          setIngredient((newIngredient) => ({ ...newIngredient, name: value }))
        }
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

          setIngredient((newIngredient) => ({
            ...newIngredient,
            image_id: response.data!.imageId,
          }));
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

      <Button className={classes.saveButton} onClick={add}>
        {t('buttons.save')}
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

        <div className={classes.images}>
          {allImageIds
            .filter((image) => {
              if (!gallerySearch) {
                return true;
              }

              // todo: load image id with tags ?
              // return image.tags?.split(',').some((tag) => tag.startsWith(gallerySearch)) ?? true;
              return true;
            })
            .map((imageId) => (
              <div key={imageId} className={classes.imageCard}>
                <Image
                  src={imageApi.makeUrl(imageId)}
                  onClick={() => {
                    setIngredient((newIngredient) => ({
                      ...newIngredient,
                      image_id: imageId,
                    }));
                  }}
                />

                <Checkbox
                  className={classes.imageCheckbox}
                  position={'absolute'}
                  isChecked={imageId === ingredient.image_id}
                  disabled
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { AddIngredientPage };
