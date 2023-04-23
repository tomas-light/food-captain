import { Badge, CloseButton } from '@chakra-ui/react';
import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, SelectField } from '@food-captain/client-shared';
import { useSelector } from '~/config/redux/useSelector';
import { NewTag, RecipeTag, Tag } from '~/models';
import classes from './RecipeTags.module.scss';

const colorSchemesMap = new Map<string | undefined, string>([
  ['#EDF2F7', 'gray'],
  ['#BEE3F8', 'blue'],
  ['#B2F5EA', 'teal'],
  ['#C6F6D5', 'green'],
  ['#FED7D7', 'red'],
  ['#E9D8FD', 'purple'],
  ['#FED7E2', 'pink'],
  ['#FEEBCB', 'orange'],
]);
const tagsColors = Array.from(colorSchemesMap.keys()) as string[];

type Props = {
  className?: string;
  tags: RecipeTag[];
  onAddTag: (tag: Tag | NewTag) => void;
  onDeleteTag: (tagId: Tag['id']) => void;
};

const RecipeTags: FC<Props> = (props) => {
  const { className, tags, onAddTag, onDeleteTag } = props;

  const { t } = useTranslation();
  const { tagsMap } = useSelector((state) => state.recipe);
  const [newTagName, setNewTagName] = useState('');

  const tagDictionaries = useMemo(() => {
    const optionsMap = new Map<Tag['id'], Option>();
    const options = [] as Option[];

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
    <div className={clsx(classes.tags, className)}>
      <SelectField
        placeholder={t('recipe.addTag')}
        styleVariant={'tiny-flushed'}
        options={tagDictionaries.options}
        isSearchable={true}
        value={null} // we don't need to display selected value here
        onInputChange={(newValue) => {
          setNewTagName(newValue);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const existedColors = new Set(
              Array.from(tagsMap.values()).map((tag) => tag.color)
            );

            const newColor = tagsColors.find(
              (color) => !existedColors.has(color)
            );
            if (newColor) {
              onAddTag({
                name: newTagName,
                color: newColor,
              });
              setNewTagName('');
            } else {
              // todo: implement regular tag creation with color specifying (modal) ?
              throw new Error('All colors already bounded');
            }
          }
        }}
        onChange={(newTagOption) => {
          if (newTagOption) {
            const tag = tagsMap.get(newTagOption.value as Tag['id']);
            if (tag) {
              onAddTag(tag);
              setNewTagName('');
            }
          }
        }}
      />

      <div>
        {tags.map(({ tag_id }) => {
          const tag = tagsMap.get(tag_id);
          const colorScheme = colorSchemesMap.get(tag?.color);
          return (
            <Badge
              key={tag_id}
              variant={'subtle'}
              colorScheme={colorScheme}
              as={'div'}
            >
              {tag?.name}

              <CloseButton
                size={'xs'}
                onClick={() => {
                  onDeleteTag(tag_id);
                }}
              />
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export { RecipeTags };
export type { Props as RecipeTagsProps };