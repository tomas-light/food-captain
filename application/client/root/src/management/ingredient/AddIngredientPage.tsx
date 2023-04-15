import { Image } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ImageField,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { NewIngredient } from '~/models';
import { appUrls } from '~/routing';
import { NavigationBar } from '~/Layout';
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
    <div>
      <h1>{t('ingredient.add')}</h1>

      <TextField
        label={t('ingredient.name')}
        value={ingredient.name ?? ''}
        onChange={(value) =>
          setIngredient((newIngredient) => ({ ...newIngredient, name: value }))
        }
      />

      <div>
        <ImageField
          label={t('ingredient.image')}
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
          className={classes.storedImage}
          src={
            ingredient.image_id
              ? imageApi.makeUrl(ingredient.image_id)
              : undefined
          }
        />
      </div>

      <Typography>Or select any of existed images:</Typography>

      <div className={classes.images}>
        {allImageIds.map((imageId) => (
          <Image
            key={imageId}
            src={imageApi.makeUrl(imageId)}
            className={classes.storedImage}
            borderRadius={8}
            border={'1px'}
            onClick={() => {
              setIngredient((newIngredient) => ({
                ...newIngredient,
                image_id: imageId,
              }));
            }}
          />
        ))}
      </div>

      <Button onClick={add}>{t('buttons.save')}</Button>
    </div>
  );
};

export { AddIngredientPage };
