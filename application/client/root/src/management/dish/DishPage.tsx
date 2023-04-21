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
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import { DishController } from '~/management/dish/redux';
import { Dish } from '~/models';
import { appUrls } from '~/routing/appUrls';
import classes from './DishPage.module.scss';

const DishPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLocaleResource('dish');
  useLocaleResource('recipe');

  const [searchString, setSearchString] = useState('');
  // todo: add search
  const dishes = useSelector((state) => {
    return state.dish.dishes;
  });

  useEffect(() => {
    dispatch(DishController.loadDishes());
  }, []);

  const onDelete = (dishId: Dish['id']) => {
    dispatch(
      DishController.removeDish({
        dishId: dishId,
        callback: () => navigate(appUrls.management.dish.url()),
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <TextField
          label={t('dish.search')}
          value={searchString}
          onChange={setSearchString}
          icon={<Icon variant={'search'} />}
          className={classes.searchField}
        />

        <Button
          className={classes.addButton}
          onClick={() => navigate(appUrls.management.dish.add.url())}
        >
          {t('dish.add')}
        </Button>
      </div>

      <div className={classes.dishes}>
        {dishes.map((dish) => (
          <Card key={dish.id}>
            <CardHeader
              className={classes.cardHeader}
              paddingX={'8px'}
              paddingTop={'8px'}
              paddingBottom={'16px'}
            >
              <Typography>{dish.name}</Typography>
            </CardHeader>

            <CardBody paddingY={0} paddingX={'8px'}>
              <Image src={ImageApi.makeUrl(dish.image_id)} />
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
                    appUrls.management.dish
                      .dishId(dish.id.toString())
                      .edit.url()
                  )
                }
                size={'sm'}
              >
                {t('dish.edit')}
              </Button>

              <Button
                onClick={() => onDelete(dish.id)}
                color={'destructive'}
                size={'sm'}
              >
                {t('dish.delete')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { DishPage };
