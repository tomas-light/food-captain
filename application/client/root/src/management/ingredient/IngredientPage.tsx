import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImageApi } from '@food-captain/client-api/src/ImageApi';
import { Button, Typography } from '@food-captain/client-shared';
import { useSelector } from '~/config/redux/useSelector';
import { appUrls } from '~/routing/appUrls';
import { IngredientController } from './redux/Ingredient.controller';

const IngredientPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingredients = useSelector((state) => state.ingredient.ingredients);

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
  }, []);

  return (
    <div>
      <h1>{t('ingredient.many')}</h1>

      <Button onClick={() => navigate(appUrls.management.ingredient.add.url())}>
        {t('ingredient.add')}
      </Button>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: '32px',
          rowGap: '32px',
        }}
      >
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            <Card width={328}>
              <CardHeader>
                <Typography>{ingredient.name}</Typography>
              </CardHeader>

              <CardBody>
                <Image src={ImageApi.makeUrl(ingredient.image_id)} />
              </CardBody>

              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(
                      appUrls.management.ingredient
                        .ingredientId(ingredient.id.toString())
                        .edit.url()
                    )
                  }
                >
                  {t('ingredient.edit')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export { IngredientPage };
