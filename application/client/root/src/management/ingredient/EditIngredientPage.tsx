import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import { IngredientPageTemplate } from '~/management/ingredient/IngredientPageTemplate';
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLocaleResource('ingredient');

  const { ingredientsMap } = useSelector((state) => state.ingredient);

  const storedIngredient = ingredientsMap.get(ingredientId);

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
  }, []);

  useEffect(() => {
    if (storedIngredient) {
      setIngredient(storedIngredient);
    }
  }, [storedIngredient]);

  const [ingredient, setIngredient] = useState<Ingredient | undefined>(
    storedIngredient
  );

  if (!ingredient) {
    return <Typography>Ingredient not found (id: {ingredientId})</Typography>;
  }

  const save = () => {
    dispatch(
      IngredientController.updateIngredient({
        ingredient,
        callback: () => navigate(appUrls.management.ingredient.url()),
      })
    );
  };

  return (
    <IngredientPageTemplate
      ingredient={ingredient}
      saveButtonLabelKey={'buttons.save'}
      onNameChanged={(newName) =>
        setIngredient((changedIngredient) => {
          if (!changedIngredient) {
            return changedIngredient;
          }
          return { ...changedIngredient, name: newName };
        })
      }
      onImageChanged={(newImageId) => {
        setIngredient((changedIngredient) => {
          if (!changedIngredient) {
            return changedIngredient;
          }
          return {
            ...changedIngredient,
            image_id: newImageId,
          };
        });
      }}
      onSave={save}
    />
  );
};

export { EditIngredientPage };
