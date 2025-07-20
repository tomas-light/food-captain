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

  const dimensions: DimensionTableEntity[] = [
    create(1, 'килограмм', 'кг'),
    create(2, 'грамм', 'гр'),
    create(3, 'штука', 'шт'),
    create(4, 'литр', 'л'),
    create(5, 'столовая ложка', 'ст.л'),
    create(6, 'чайная ложка', 'чай.л'),
    create(7, 'щепотка', 'щеп'),
  ];

  function create(
    id: DimensionTableEntity['id'],
    name: DimensionTableEntity['name'],
    short_name: DimensionTableEntity['short_name']
  ): DimensionTableEntity {
    return {
      id,
      name,
      short_name,
    };
  }

  return {
    saveDimensions: () => {
      dimensions.forEach((dimension) => {
        void database.dimension.insert(dimension.id, dimension);
      });
    },
  };
}
