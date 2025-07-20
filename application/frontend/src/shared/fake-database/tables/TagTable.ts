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

  let id = 0;
  const tags: TagTableEntity[] = [
    create('Вегетерианское', '#EDF2F7'),
    create('Мясное', '#BEE3F8'),
    create('Суп', '#B2F5EA'),
  ];

  function create(
    name: TagTableEntity['name'],
    color: TagTableEntity['color']
  ): TagTableEntity {
    return {
      id: ++id,
      name,
      color,
    };
  }

  return {
    tags,
    saveTags: () => {
      tags.forEach((tag) => {
        void database.tag.insert(tag.id, tag);
      });
    },
  };
}
