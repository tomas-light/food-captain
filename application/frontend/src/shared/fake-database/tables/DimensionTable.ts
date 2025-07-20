import type { Database } from '../../database';
import type { DimensionTableEntity } from './DimensionTable.entity';

export interface DimensionTable {
  key: DimensionTableEntity['id'];
  value: DimensionTableEntity;
}

export function initDimensionTable(options: {
  database: Database<{
    dimension: DimensionTable;
  }>;
}) {
  const { database } = options;

  let id = 0;
  const dimensions: DimensionTableEntity[] = [
    create('килограмм', 'кг'),
    create('грамм', 'гр'),
    create('штука', 'шт'),
    create('литр', 'л'),
    create('столовая ложка', 'ст.л'),
    create('чайная ложка', 'чай.л'),
    create('щепотка', 'щеп'),
  ];

  function create(
    name: DimensionTableEntity['name'],
    short_name: DimensionTableEntity['short_name']
  ): DimensionTableEntity {
    return {
      id: ++id,
      name,
      short_name,
    };
  }

  return {
    dimensions,
    saveDimensions: () => {
      dimensions.forEach((dimension) => {
        void database.dimension.insert(dimension.id, dimension);
      });
    },
  };
}
