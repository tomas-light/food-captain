import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { guid } from '@food-captain/client-utils';
import { Icon, IconButton, TextField } from '@food-captain/client-shared';
import { Recipe, RecipeDescriptionBlock } from '~/models';
import { DescriptionBlock, DescriptionBlockProps } from './DescriptionBlock';
import classes from './RecipeDescription.module.scss';

type Props = Pick<
  DescriptionBlockProps,
  | 'onChangeDescriptionBlock'
  | 'onChangeDescriptionBlocks'
  | 'onDeleteDescriptionBlock'
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
    onChangeDescriptionBlocks,
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
          onChangeDescriptionBlocks={onChangeDescriptionBlocks}
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
                content: [],
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
                content: [],
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
