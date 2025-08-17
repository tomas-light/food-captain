import { useTranslation } from '~/shared/locale';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '~/shared/ui';
import { useNewRecipeForm } from '../../model/useNewRecipeForm';
import classes from './CreateRecipeDialog.module.scss';

type Props = {
  onClose: VoidFunction;
};

export function CreateRecipeDialog(props: Props) {
  const { onClose } = props;

  const { t } = useTranslation('widgets/recipe', {
    keyPrefix: 'CreateRecipeDialog',
  });

  const form = useNewRecipeForm();

  return (
    <Dialog onClose={onClose} className={classes.root}>
      <DialogHeader>{t('header.title')}</DialogHeader>

      <DialogContent className={classes.content}>
        <form
          onSubmit={(event) => {
            event.stopPropagation();
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <form.AppField
            name="name"
            children={(field) => (
              <field.Text label={t('form.name')} autoComplete="recipe name" />
            )}
          />
          <form.AppField
            name="description"
            children={(field) => (
              <field.Text
                label={t('form.description')}
                autoComplete="recipe description"
              />
            )}
          />
        </form>
      </DialogContent>

      <DialogFooter>
        {({ onClose }) => (
          <>
            <Button onClick={onClose} variant="outline" elevated>
              {t('footer.cancel')}
            </Button>

            <form.AppForm>
              <form.SubmitButton label={t('footer.submit')} />
            </form.AppForm>
          </>
        )}
      </DialogFooter>
    </Dialog>
  );
}
