import { describe, expect, test } from 'vitest';
import { flatResourcesKeys } from './flatResourcesKeys';

describe('[function] flatResourcesKeys', () => {
  test('resources should be flatten and values should be deleted', () => {
    expect(
      flatResourcesKeys({
        'entities/Some': {
          some: 'что-то',
          portion_zero: '{{count}} порций',
          portion_one: '{{count}} порция',
          portion_two: '{{count}} порции',
          portion_few: '{{count}} порций',
          portion_many: '{{count}} порций',
          portion_other: '{{count}} порций',
          modal: {
            title: 'Заголовок',
            body: {
              name: 'Название',
            },
            buttons: {
              ok: 'Сохранить',
              cancel: {
                confirm: 'Подтвердить',
              },
            },
          },
        },
      })
    ).toStrictEqual({
      'entities/Some.portion': null,
      'entities/Some.some': null,
      'entities/Some.modal.title': null,
      'entities/Some.modal.body.name': null,
      'entities/Some.modal.buttons.ok': null,
      'entities/Some.modal.buttons.cancel.confirm': null,
    });
  });
});
