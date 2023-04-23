import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Icon,
  IconButton,
  TextAreaField,
  TextField,
} from '@food-captain/client-shared';
import { guid } from '@food-captain/client-utils';
import { Recipe, RecipeDescriptionBlock } from '~/models';
import classes from './RecipeDescription.module.scss';

type Props = {
  className?: string;
  name: Recipe['name'];
  onNameChanged: (newName: Recipe['name']) => void;

  blocks: RecipeDescriptionBlock[];
  onAddDescriptionBlock: (descriptionBlock: RecipeDescriptionBlock) => void;
  onChangeDescriptionBlock: (descriptionBlock: RecipeDescriptionBlock) => void;
  onDeleteDescriptionBlock: (descriptionBlock: RecipeDescriptionBlock) => void;
};

export const RecipeDescription: FC<Props> = (props) => {
  const {
    className,
    name,
    onNameChanged,

    blocks,
    onAddDescriptionBlock,
    onChangeDescriptionBlock,
    onDeleteDescriptionBlock,
  } = props;

  const { t } = useTranslation();

  return (
    <div className={clsx(classes.root, className)}>
      <TextField
        label={t('recipe.name')}
        value={name ?? ''}
        onChange={onNameChanged}
        icon={<Icon variant={'title'} />}
        variant={'flushed'}
      />

      {blocks.map((block) => {
        switch (block.type) {
          case 'step':
          case 'text':
            return (
              <TextAreaField
                key={block.reactId}
                label={t('recipe.instruction')}
                value={block.content ?? ''}
                onChange={(newValue) => {
                  onChangeDescriptionBlock({
                    ...block,
                    content: newValue,
                  });
                }}
                // icon={<Icon variant={'title'} />}
              />
            );

          default:
            return (
              <TextAreaField
                key={block.reactId}
                label={t('recipe.instruction')}
                value={block.content ?? ''}
                onChange={(newValue) => {
                  onChangeDescriptionBlock({
                    ...block,
                    content: newValue,
                  });
                }}
                // icon={<Icon variant={'title'} />}
              />
            );
        }
      })}

      <Menu>
        <MenuButton
          as={IconButton}
          className={classes.addButton}
          title={t('buttons.add') ?? ''}
        >
          <Icon variant={'plus'} />
        </MenuButton>

        <MenuList>
          <MenuItem
            onClick={() => {
              onAddDescriptionBlock({
                type: 'text',
                reactId: guid(),
                content: '',
                order: blocks.length ?? 0,
              });
            }}
          >
            {t('recipe.addTextDescription')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              onAddDescriptionBlock({
                type: 'step',
                reactId: guid(),
                content: '',
                order: blocks.length ?? 0,
              });
            }}
          >
            {t('recipe.addStepDescription')}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export type { Props as RecipeDescriptionProps };
