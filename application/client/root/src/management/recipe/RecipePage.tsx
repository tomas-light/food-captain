import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Icon,
  Image,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { useSelector } from '~/config/redux/useSelector';
import { RecipeController } from '~/management/recipe/redux';
import { Recipe } from '~/models';
import { appUrls } from '~/routing/appUrls';
import classes from './RecipePage.module.scss';

const RecipePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLocaleResource('recipe');

  const [searchString, setSearchString] = useState('');
  // todo: add search
  const { recipesMap } = useSelector((state) => state.recipe);

  const recipes = useMemo(() => Array.from(recipesMap.values()), [recipesMap]);

  useEffect(() => {
    dispatch(RecipeController.loadRecipes());
  }, []);

  const onDelete = (recipeId: Recipe['id']) => {
    dispatch(
      RecipeController.deleteRecipe({
        recipeId: recipeId,
        callback: () => navigate(appUrls.management.recipe.url()),
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <TextField
          label={t('recipe.search')}
          value={searchString}
          onChange={setSearchString}
          icon={<Icon variant={'search'} />}
          className={classes.searchField}
        />

        <Button
          className={classes.addButton}
          onClick={() => navigate(appUrls.management.recipe.add.url())}
        >
          {t('recipe.add')}
        </Button>
      </div>

      <div className={classes.dishes}>
        {recipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardHeader
              className={classes.cardHeader}
              paddingX={'8px'}
              paddingTop={'8px'}
              paddingBottom={'16px'}
            >
              <Typography>{recipe.name}</Typography>
            </CardHeader>

            <CardBody paddingY={0} paddingX={'8px'}>
              <Image
                src={ImageApi.makeUrl(recipe.image_id)}
                onClick={() => {
                  navigate(
                    appUrls.management.recipe
                      .recipeId(recipe.id.toString())
                      .url()
                  );
                }}
              />
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
                    appUrls.management.recipe
                      .recipeId(recipe.id.toString())
                      .edit.url()
                  )
                }
                size={'sm'}
              >
                {t('recipe.edit')}
              </Button>

              <Button
                onClick={() => onDelete(recipe.id)}
                color={'destructive'}
                size={'sm'}
              >
                {t('recipe.delete')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { RecipePage };
