import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@food-captain/client-shared/src/organisms/fields/TextField';
import { Button } from '@food-captain/client-shared';
import { useSelector } from '~/config/redux/useSelector';
import { Ingredient } from '~/models';
import { appUrls } from '~/routing';
import { IngredientController } from './redux/Ingredient.controller';

function useIngredientId() {
  const { ingredientId } = useParams();

  return useMemo(() => {
    if (!ingredientId) {
      return undefined;
    }
    const id = parseInt(ingredientId, 10);
    if (isNaN(id)) {
      return undefined;
    }
    return id;
  }, [ingredientId]);
}

const EditIngredientPage = () => {
  const ingredientId = useIngredientId();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingredients = useSelector((state) => state.ingredient.ingredients);

  const storedIngredient = useSelector((state) =>
    state.ingredient.ingredients.find(
      (_ingredient) => _ingredient.id === ingredientId
    )
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(IngredientController.loadIngredients());
    }
  }, []);

  useEffect(() => {
    setIngredient(storedIngredient);
  }, [storedIngredient]);

  const [ingredient, setIngredient] = useState<Ingredient | undefined>(
    storedIngredient
  );

  if (!ingredient) {
    return <p>Ingredient not found (id: {ingredientId})</p>;
  }

  const save = () => {
    dispatch(
      IngredientController.updateIngredient({
        ingredient,
        callback: () => navigate(appUrls.management.ingredient.url()),
      })
    );
  };

  const remove = () => {
    dispatch(
      IngredientController.removeIngredient({
        ingredientId: ingredient.id,
        callback: () => navigate(appUrls.management.ingredient.url()),
      })
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        rowGap: '16px',
      }}
    >
      <Button onClick={() => navigate(appUrls.management.ingredient.url())}>
        {t('buttons.back')}
      </Button>

      <h1>{t('ingredient.edit')}</h1>

      <TextField
        label={t('ingredient.name')}
        value={ingredient.name ?? ''}
        onChange={(value) => {
          setIngredient(
            (_ingredient) => ({ ..._ingredient, name: value } as Ingredient)
          );
        }}
      />
      <TextField
        label={t('ingredient.image')}
        value={''}
        onChange={(value) => {
          // setIngredient((_ingredient) => ({ ..._ingredient, image: value }))
        }}
      />

      <Button onClick={save}>{t('buttons.save')}</Button>
      <Button onClick={remove}>{t('buttons.delete')}</Button>
    </div>
  );
};

export { EditIngredientPage };
