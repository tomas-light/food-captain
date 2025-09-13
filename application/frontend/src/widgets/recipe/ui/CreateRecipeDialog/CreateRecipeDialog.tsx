import { toast } from 'react-toastify';
import { useTranslation } from '~/shared/locale';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '~/shared/ui';
import { useNewRecipeForm } from '~/features/new-recipe';
import classes from './CreateRecipeDialog.module.scss';

type Props = {
  onClose: VoidFunction;
};

export function CreateRecipeDialog(props: Props) {
  const { onClose } = props;

  const { t } = useTranslation('widgets/recipe', {
    keyPrefix: 'CreateRecipeDialog',
  });

  const form = useNewRecipeForm(() => {
    toast(t('successCreated'), { type: 'success' });
    onClose();
  });

  return (
    <form.AppForm>
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
            <form.AppField
              name="formula"
              children={(field) => (
                <field.Text
                  label={t('form.formula')}
                  autoComplete="recipe formula"
                />
              )}
            />

            <section className={classes.numbersSection}>
              <form.AppField
                name="cookingTimeInMinutes"
                children={(field) => (
                  <field.Number
                    label={t('form.cookingTime')}
                    autoComplete="recipe cooking time"
                  />
                )}
              />

              <form.AppField
                name="portionWeightInGrams"
                children={(field) => (
                  <field.Number
                    label={t('form.portionWeight')}
                    autoComplete="recipe portion weight"
                  />
                )}
              />

              <form.AppField
                name="kcal"
                children={(field) => (
                  <field.Number
                    label={t('form.kcal')}
                    autoComplete="recipe kcal"
                  />
                )}
              />
            </section>
          </form>
        </DialogContent>

        <DialogFooter>
          {({ onClose }) => (
            <>
              <Button onClick={onClose} variant="outline" elevated>
                {t('footer.cancel')}
              </Button>

              <form.SubmitButton label={t('footer.submit')} />
            </>
          )}
        </DialogFooter>
      </Dialog>
    </form.AppForm>
  );
}
