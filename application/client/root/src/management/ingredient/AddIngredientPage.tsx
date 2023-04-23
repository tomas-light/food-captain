import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocaleResource } from '~/config/i18next';
import { Ingredient, NewIngredient } from '~/models';
import { appUrls } from '~/routing';
import { IngredientPageTemplate } from './IngredientPageTemplate';
import { IngredientController } from './redux/Ingredient.controller';

type Props = {
  callback?: (newIngredient: Ingredient) => void;
};

export const AddIngredientPage: FC<Props> = (props) => {
  const { callback } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLocaleResource('ingredient');

  const [ingredient, setIngredient] = useState<NewIngredient>({
    name: '',
  });

  const add = () => {
    dispatch(
      IngredientController.addIngredient({
        ingredient,
        callback:
          callback ?? (() => navigate(appUrls.management.ingredient.url())),
      })
    );
  };

  return (
    <IngredientPageTemplate
      ingredient={ingredient}
      saveButtonLabelKey={'buttons.save'}
      onNameChanged={(newName) =>
        setIngredient((newIngredient) => ({ ...newIngredient, name: newName }))
      }
      onImageChanged={(newImageId) => {
        setIngredient((newIngredient) => ({
          ...newIngredient,
          image_id: newImageId,
        }));
      }}
      onSave={add}
    />
  );
};
