import type { Database } from '../../database';
import type { TagTableEntity } from './TagTable.entity';

export interface TagTable {
  key: TagTableEntity['id'];
  value: TagTableEntity;
}

export function initTagTable(options: {
  database: Database<{
    tag: TagTable;
  }>;
}) {
  const { database } = options;

  const tags: TagTableEntity[] = [
    create(1, 'Вегетерианское', '#EDF2F7'),
    create(3, 'Мясное', '#BEE3F8'),
    create(8, 'Суп', '#B2F5EA'),
  ];

  function create(
    id: TagTableEntity['id'],
    name: TagTableEntity['name'],
    color: TagTableEntity['color']
  ): TagTableEntity {
    return {
      id,
      name,
      color,
    };
  }

  return {
    saveTags: () => {
      tags.forEach((tag) => {
        void database.tag.insert(tag.id, tag);
      });
    },
  };
}
