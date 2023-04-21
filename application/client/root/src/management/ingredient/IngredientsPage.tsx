import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Icon,
  Image,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api/src/ImageApi';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import { Ingredient } from '~/models';
import { appUrls } from '~/routing/appUrls';
import { IngredientController, selectIngredientsBySearchString } from './redux';
import classes from './IngredientsPage.module.scss';

const IngredientsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState('');
  const ingredients = useSelector((state) =>
    selectIngredientsBySearchString(state, searchString)
  );

  useLocaleResource('ingredient');

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
  }, []);

  const onDelete = (ingredientId: Ingredient['id']) => {
    dispatch(
      IngredientController.removeIngredient({
        ingredientId: ingredientId,
        callback: () => navigate(appUrls.management.ingredient.url()),
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <TextField
          label={t('ingredient.search')}
          value={searchString}
          onChange={setSearchString}
          icon={<Icon variant={'search'} />}
          className={classes.searchField}
        />

        <Button
          className={classes.addButton}
          onClick={() => navigate(appUrls.management.ingredient.add.url())}
        >
          {t('ingredient.add')}
        </Button>
      </div>

      <div className={classes.ingredients}>
        {ingredients.map((ingredient) => (
          <Card key={ingredient.id}>
            <CardHeader
              className={classes.cardHeader}
              paddingX={'8px'}
              paddingTop={'8px'}
              paddingBottom={'16px'}
            >
              <Typography>{ingredient.name}</Typography>
            </CardHeader>

            <CardBody paddingY={0} paddingX={'8px'}>
              <Image src={ImageApi.makeUrl(ingredient.image_id)} />
            </CardBody>

            <CardFooter
              className={classes.cardFooter}
              paddingX={'8px'}
              paddingTop={'16px'}
              paddingBottom={'8px'}
            >
              <Button
                onClick={() =>
                  navigate(
                    appUrls.management.ingredient
                      .ingredientId(ingredient.id.toString())
                      .edit.url()
                  )
                }
                size={'sm'}
              >
                {t('ingredient.edit')}
              </Button>

              <Button
                onClick={() => onDelete(ingredient.id)}
                color={'destructive'}
                size={'sm'}
              >
                {t('ingredient.delete')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { IngredientsPage };
