import { FC, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ApplyFormatIconButton,
  ApplyListIconButton,
  Icon,
  IconButton,
  RichTextField,
  RichTextFieldRef,
  Typography,
} from '@food-captain/client-shared';
import { RecipeDescriptionBlock } from '~/models';
import classes from './DescriptionBlock.module.scss';

type Props = {
  allBlocks: RecipeDescriptionBlock[];
  block: RecipeDescriptionBlock;
  onChangeDescriptionBlock: (changedBlock: RecipeDescriptionBlock) => void;
  onChangeDescriptionBlocks: (changedBlocks: RecipeDescriptionBlock[]) => void;
  onDeleteDescriptionBlock: (deletingBlock: RecipeDescriptionBlock) => void;
  autoFocus?: boolean;
};

export const DescriptionBlock: FC<Props> = (props) => {
  const {
    allBlocks,
    block,
    onChangeDescriptionBlock,
    onChangeDescriptionBlocks,
    onDeleteDescriptionBlock,
    autoFocus,
  } = props;

  const { t } = useTranslation();
  const richTextFieldRef = useRef<RichTextFieldRef>(null);

  const previousBlocks = useMemo(
    () => allBlocks.filter((_block) => _block.order < block.order),
    [allBlocks, block]
  );
  const previousSteps = useMemo(
    () => previousBlocks.filter((_block) => _block.type === 'step'),
    [previousBlocks, block]
  );
  const furtherBlocks = useMemo(
    () => allBlocks.filter((_block) => _block.order > block.order),
    [allBlocks, block]
  );

  switch (block.type) {
    case 'step':
      return (
        <div className={classes.step}>
          <Typography>
            {t('recipe.description.step.name', {
              number: previousSteps.length + 1,
            })}
          </Typography>

          <IconButton
            icon={<Icon variant={'chevronUp'} />}
            title={t('recipe.description.step.up') ?? ''}
            state={{ disabled: previousBlocks.length === 0 }}
            onClick={() => {
              const previousBlock = previousBlocks.at(-1);
              if (!previousBlock) {
                return;
              }

              onChangeDescriptionBlocks([
                {
                  ...previousBlock,
                  order: block.order,
                },
                {
                  ...block,
                  order: previousBlock.order,
                },
              ]);
            }}
          />
          <IconButton
            icon={<Icon variant={'chevronDown'} />}
            title={t('recipe.description.step.down') ?? ''}
            state={{ disabled: furtherBlocks.length === 0 }}
            onClick={() => {
              const nextBlock = furtherBlocks.at(0);
              if (!nextBlock) {
                return;
              }

              onChangeDescriptionBlocks([
                {
                  ...nextBlock,
                  order: block.order,
                },
                {
                  ...block,
                  order: nextBlock.order,
                },
              ]);
            }}
          />

          <div className={classes.rtfToolbar}>
            <ApplyFormatIconButton
              editor={richTextFieldRef.current?.editor}
              format="bold"
              icon="rtfBold"
            />
            <ApplyListIconButton
              editor={richTextFieldRef.current?.editor}
              list="bullet"
              icon="rtfListBullet"
            />
          </div>

          <div className={classes.stepBlock}>
            <RichTextField
              ref={richTextFieldRef}
              hideToolbar
              autoFocus={autoFocus}
              placeholder={t('recipe.instruction')}
              value={block.content}
              onChange={(newValue) => {
                onChangeDescriptionBlock({
                  ...block,
                  content: newValue,
                });
              }}
            />
            <IconButton
              title={t('recipe.description.deleteBlock') ?? ''}
              icon={<Icon variant={'minus'} />}
              onClick={() => {
                onDeleteDescriptionBlock(block);
              }}
            />
          </div>
        </div>
      );

    case 'text':
    default:
      return (
        <div className={classes.textBlock}>
          <div className={classes.rtfToolbar}>
            <ApplyFormatIconButton
              editor={richTextFieldRef.current?.editor}
              format="bold"
              icon="rtfBold"
            />
            <ApplyListIconButton
              editor={richTextFieldRef.current?.editor}
              list="bullet"
              icon="rtfListBullet"
            />
          </div>

          <RichTextField
            ref={richTextFieldRef}
            hideToolbar
            autoFocus={autoFocus}
            placeholder={t('recipe.instruction')}
            value={block.content}
            onChange={(newValue) => {
              onChangeDescriptionBlock({
                ...block,
                content: newValue,
              });
            }}
          />
          <IconButton
            title={t('recipe.description.deleteBlock') ?? ''}
            icon={<Icon variant={'minus'} />}
            onClick={() => {
              onDeleteDescriptionBlock(block);
            }}
          />
        </div>
      );
  }
};

export type { Props as DescriptionBlockProps };
