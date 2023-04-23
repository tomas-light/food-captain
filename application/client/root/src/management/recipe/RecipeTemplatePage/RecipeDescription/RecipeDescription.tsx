import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Icon,
  IconButton,
  TextAreaField,
  TextField,
} from '@food-captain/client-shared';
import { guid } from '@food-captain/client-utils';
import {
  DescriptionBlock,
  DescriptionBlockProps,
} from '~/management/recipe/RecipeTemplatePage/RecipeDescription/DescriptionBlock';
import { Recipe, RecipeDescriptionBlock } from '~/models';
import classes from './RecipeDescription.module.scss';

type Props = Pick<
  DescriptionBlockProps,
  'onChangeDescriptionBlock' | 'onDeleteDescriptionBlock'
> & {
  className?: string;
  name: Recipe['name'];
  onNameChanged: (newName: Recipe['name']) => void;

  blocks: RecipeDescriptionBlock[];
  onAddDescriptionBlock: (descriptionBlock: RecipeDescriptionBlock) => void;
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
  const orderedBlocks = useMemo(
    () =>
      blocks.sort(
        (leftBlock, rightBlock) => leftBlock.order - rightBlock.order
      ),
    [blocks]
  );

  return (
    <div className={clsx(classes.root, className)}>
      <TextField
        label={t('recipe.name')}
        value={name ?? ''}
        onChange={onNameChanged}
        icon={<Icon variant={'title'} />}
        variant={'flushed'}
      />

      {orderedBlocks.map((block) => (
        <DescriptionBlock
          key={block.reactId}
          allBlocks={orderedBlocks}
          block={block}
          onChangeDescriptionBlock={onChangeDescriptionBlock}
          onDeleteDescriptionBlock={onDeleteDescriptionBlock}
        />
      ))}

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
            {t('recipe.description.addText')}
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
            {t('recipe.description.addStep')}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export type { Props as RecipeDescriptionProps };
