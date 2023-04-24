import { FC, useRef } from 'react';
import { Button, Icon, TextField } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { Ingredient, NewIngredient } from '~/models';
import {
  GalleryModal,
  GalleryModalRef,
  ImageFieldWithPreview,
} from '~/templates';
import classes from './IngredientPageTemplate.module.scss';

type Props = {
  ingredient: Ingredient | NewIngredient;
  onNameChanged: (newName: Ingredient['name']) => void;
  onImageChanged: (newImageId: Ingredient['image_id']) => void;
  saveButtonLabelKey: string;
  onSave: () => void;
};

const IngredientPageTemplate: FC<Props> = (props) => {
  const {
    ingredient,
    onNameChanged,
    onImageChanged,
    saveButtonLabelKey,
    onSave,
  } = props;

  const { t } = useTranslation();

  useLocaleResource('ingredient');

  const ref = useRef<GalleryModalRef>(null);

  return (
    <div className={classes.root}>
      <TextField
        className={classes.titleField}
        icon={<Icon variant={'title'} />}
        label={t('ingredient.name')}
        value={ingredient.name ?? ''}
        onChange={onNameChanged}
        autoFocus
      />

      <ImageFieldWithPreview
        className={classes.imageField}
        imageId={ingredient.image_id}
        imageTags={['ingredient']}
        onImageChanged={onImageChanged}
        onOpenGallery={() => {
          ref.current?.onOpen();
        }}
      />

      <GalleryModal onChoose={onImageChanged} ref={ref} />

      <Button className={classes.saveButton} onClick={onSave}>
        {t(saveButtonLabelKey)}
      </Button>
    </div>
  );
};

export { IngredientPageTemplate };
export type { Props as IngredientPageTemplateProps };
