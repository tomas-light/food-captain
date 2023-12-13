import { Badge, CloseButton } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { Option, SelectField } from '@food-captain/client-shared';
import { colorSchemesMap } from '../constants';
import { Tag } from '../../../models';
import { useTranslation } from '../../../config/i18next/TranslationContext';
import { useSelector } from '../../../config/redux/useSelector';
import classes from './TagsFilter.module.scss';

type Props = {
  tagIds?: Tag['id'][];
  onChangeTags: (
    update: (tagIds?: Tag['id'][]) => undefined | Tag['id'][]
  ) => void;
};

export const TagsFilter: FC<Props> = (props) => {
  const { tagIds, onChangeTags } = props;

  const { t } = useTranslation();
  const { tagsMap } = useSelector((state) => state.recipe);

  const tagDictionaries = useMemo(() => {
    const optionsMap = new Map<Tag['id'], Option>();
    const options = [] as Option<Tag['id']>[];

    for (const tag of tagsMap.values()) {
      const option: Option<Tag['id']> = {
        label: tag.name ?? '<no name> for tag',
        value: tag.id,
      };
      optionsMap.set(tag.id, option);
      options.push(option);
    }

    return { options, optionsMap };
  }, [tagsMap]);

  return (
    <>
      <SelectField
        placeholder={t('recipe.filters.search')}
        options={tagDictionaries.options}
        isSearchable={true}
        value={null} // we don't need to display selected value here
        onChange={(newTagOption) => {
          if (newTagOption) {
            onChangeTags((selectedIds) => {
              const tagId = newTagOption.value;

              const tagIdSet = new Set(tagIds);
              if (tagIdSet.has(tagId)) {
                return selectedIds;
              }

              return tagIds?.concat([tagId]) ?? [tagId];
            });
          }
        }}
      />

      <div className={classes.tags}>
        {tagIds?.map((tagId) => {
          const tag = tagsMap.get(tagId);
          const colorScheme = colorSchemesMap.get(tag?.color);
          return (
            <Badge
              key={tagId}
              variant={'subtle'}
              colorScheme={colorScheme}
              as={'div'}
            >
              {tag?.name}

              <CloseButton
                size={'xs'}
                onClick={() => {
                  onChangeTags((selectedIds) => {
                    let tagIds = selectedIds?.filter(
                      (_tagId) => _tagId !== tagId
                    );
                    if (tagIds && !tagIds.length) {
                      tagIds = undefined;
                    }

                    return tagIds;
                  });
                }}
              />
            </Badge>
          );
        })}
      </div>
    </>
  );
};
