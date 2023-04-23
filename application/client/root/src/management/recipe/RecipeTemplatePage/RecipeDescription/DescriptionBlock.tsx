import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Icon,
  IconButton,
  TextAreaField,
  Typography,
} from '@food-captain/client-shared';
import { RecipeDescriptionBlock } from '~/models';
import classes from './DescriptionBlock.module.scss';

type Props = {
  allBlocks: RecipeDescriptionBlock[];
  block: RecipeDescriptionBlock;
  onChangeDescriptionBlock: (descriptionBlock: RecipeDescriptionBlock) => void;
  onDeleteDescriptionBlock: (descriptionBlock: RecipeDescriptionBlock) => void;
};

export const DescriptionBlock: FC<Props> = (props) => {
  const {
    allBlocks,
    block,
    onChangeDescriptionBlock,
    onDeleteDescriptionBlock,
  } = props;

  const { t } = useTranslation();
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

              onChangeDescriptionBlock({
                ...previousBlock,
                order: block.order,
              });
              onChangeDescriptionBlock({
                ...block,
                order: previousBlock.order,
              });
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

              onChangeDescriptionBlock({
                ...nextBlock,
                order: block.order,
              });
              onChangeDescriptionBlock({
                ...block,
                order: nextBlock.order,
              });
            }}
          />

          <div className={classes.field}>
            <TextAreaField
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
        <div className={classes.field}>
          <TextAreaField
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
