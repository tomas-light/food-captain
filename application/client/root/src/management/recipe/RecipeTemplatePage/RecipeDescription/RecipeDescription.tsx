import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, TextField } from '@food-captain/client-shared';
import { guid } from '@food-captain/client-utils';
import { useTranslation } from '~/config/i18next/TranslationContext';
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

  const [canAutoFocus, setCanAutoFocus] = useState(false);

  useEffect(() => {
    // auto focus blocks only once after it added
    // otherwise after draft resetting the block
    // will be focused again
    if (canAutoFocus) {
      setTimeout(() => {
        setCanAutoFocus(false);
      }, 1000);
    }
  }, [canAutoFocus]);

  return (
    <div className={clsx(classes.root, className)}>
      <TextField
        label={t('recipe.name')}
        value={name ?? ''}
        onChange={onNameChanged}
        icon={<Icon variant={'title'} />}
        variant={'flushed'}
      />

      {orderedBlocks.map((block, blockIndex) => (
        <DescriptionBlock
          key={block.reactId}
          allBlocks={orderedBlocks}
          block={block}
          onChangeDescriptionBlocks={onChangeDescriptionBlocks}
          onChangeDescriptionBlock={onChangeDescriptionBlock}
          onDeleteDescriptionBlock={onDeleteDescriptionBlock}
          autoFocus={canAutoFocus && blockIndex === orderedBlocks.length - 1}
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
              // to be able to correct focus RTF element,
              //  we have to wait till menu will be closed
              //  before to add new item is added
              setTimeout(() => {
                setCanAutoFocus(true);
                onAddDescriptionBlock({
                  type: 'text',
                  reactId: guid(),
                  content: [],
                  order: blocks.length ?? 0,
                });
              }, 50);
            }}
          >
            {t('recipe.description.addText')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              // to be able to correct focus RTF element,
              //  we have to wait till menu will be closed
              //  before to add new item is added
              setTimeout(() => {
                setCanAutoFocus(true);
                onAddDescriptionBlock({
                  type: 'step',
                  reactId: guid(),
                  content: [],
                  order: blocks.length ?? 0,
                });
              }, 50);
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
