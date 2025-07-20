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

  const ingredients: IngredientTableEntity[] = [
    create(1, 'лук', 1),
    create(2, 'Чеснок', 2),
    create(7, 'Крабовые палочки', 7),
    create(8, 'Томат', 8),
    create(9, 'Красный болгарский перец', 6),
    create(10, 'Сыр', 9),
    create(11, 'Майонез', 10),
    create(12, 'Говядина на кости', 14),
    create(13, 'Картофель', 15),
    create(14, 'Свёкла', 16),
    create(15, 'Морковь', 17),
    create(16, 'Томатная паста', 18),
    create(17, 'Подсолнечное масло', 19),
    create(18, 'Капуста', 20),
    create(19, 'Лимонная кислота', 21),
    create(20, 'Макароны', 23),
  ];
  function create(
    id: IngredientTableEntity['id'],
    name: IngredientTableEntity['name'],
    image_id: IngredientTableEntity['image_id']
  ): IngredientTableEntity {
    return {
      id,
      name,
      image_id,
    };
  }

  return {
    saveIngredients: () => {
      ingredients.forEach((dimension) => {
        void database.ingredient.insert(dimension.id, dimension);
      });
    },
  };
}
