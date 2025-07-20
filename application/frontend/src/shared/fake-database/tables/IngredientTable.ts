import type { Database } from '../../database';
import type { IngredientTableEntity } from './IngredientTable.entity';

export interface IngredientTable {
  key: IngredientTableEntity['id'];
  value: IngredientTableEntity;
}

export function initIngredientTable(options: {
  database: Database<{
    ingredient: IngredientTable;
  }>;
}) {
  const { database } = options;

  let id = 0;
  const ingredients: IngredientTableEntity[] = [
    create('лук'),
    create('Чеснок'),
    create('Крабовые палочки'),
    create('Томат'),
    create('Красный болгарский перец'),
    create('Сыр'),
    create('Майонез'),
    create('Говядина на кости'),
    create('Картофель'),
    create('Свёкла'),
    create('Морковь'),
    create('Томатная паста'),
    create('Подсолнечное масло'),
    create('Капуста'),
    create('Лимонная кислота'),
    create('Макароны'),
  ];

  function create(name: IngredientTableEntity['name']): IngredientTableEntity {
    return {
      id: ++id,
      name,
      image_id: undefined,
    };
  }

  return {
    ingredients,
    saveIngredients: () => {
      ingredients.forEach((dimension) => {
        void database.ingredient.insert(dimension.id, dimension);
      });
    },
  };
}
