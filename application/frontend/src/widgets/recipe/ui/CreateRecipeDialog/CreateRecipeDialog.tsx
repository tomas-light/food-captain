import { useTranslation } from '~/shared/locale';
import { Dialog, DialogContent, DialogHeader } from '~/shared/ui';
import classes from './CreateRecipeDialog.module.scss';

type Props = {
  onClose: VoidFunction;
};

export function CreateRecipeDialog(props: Props) {
  const { onClose } = props;

  const { t } = useTranslation('widgets/recipe', {
    keyPrefix: 'CreateRecipeDialog',
  });

  return (
    <Dialog onClose={onClose} className={classes.root}>
      <DialogHeader>{t('header.title')}</DialogHeader>

      <DialogContent className={classes.content}>
        <div>
          <label htmlFor="recipe.name">{t('form.name')}</label>
          <input id="recipe.name" name="name" autoComplete="recipe name" />
        </div>

        <div>
          <label htmlFor="recipe.description">{t('form.description')}</label>
          <input
            id="recipe.description"
            name="description"
            autoComplete="recipe description"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
