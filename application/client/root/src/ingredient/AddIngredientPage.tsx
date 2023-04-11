import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@food-captain/client-shared/src/organisms/fields/TextField';
import { Button } from '@food-captain/client-shared';
import { NewIngredient } from '~/models';
import { appUrls } from '~/routing';
import { IngredientController } from './redux/Ingredient.controller';

const AddIngredientPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ingredient, setIngredient] = useState<NewIngredient>({
    name: '',
  });

  const add = () => {
    dispatch(
      IngredientController.addIngredient({
        ingredient,
        callback: () => navigate(appUrls.ingredient.url()),
      })
    );
  };

  return (
    <div>
      <Button onClick={() => navigate(appUrls.ingredient.url())}>
        {t('buttons.back')}
      </Button>

      <h1>{t('ingredient.add')}</h1>

      <TextField
        label={t('ingredient.name')}
        value={ingredient.name ?? ''}
        onChange={(value) =>
          setIngredient((_dish) => ({ ..._dish, name: value }))
        }
      />
      <TextField
        label={t('ingredient.image')}
        value={''}
        onChange={(value) =>
          setIngredient((_dish) => ({ ..._dish, image: value }))
        }
      />

      <Button onClick={add}>{t('buttons.save')}</Button>
    </div>
  );
};

export { AddIngredientPage };
