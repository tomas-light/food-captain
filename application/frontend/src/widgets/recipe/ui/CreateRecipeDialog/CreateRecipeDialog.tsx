import { useTranslation } from '~/shared/locale';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  FieldValidationError,
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
          <form.Field
            name="name"
            children={(field) => (
              <div>
                <label htmlFor={field.name}>{t('form.name')}</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  autoComplete="recipe name"
                />
                <FieldValidationError field={field} />
              </div>
            )}
          />
          <form.Field
            name="description"
            children={(field) => (
              <div>
                <label htmlFor={field.name}>{t('form.description')}</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  autoComplete="recipe description"
                />
                <FieldValidationError field={field} />
              </div>
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

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  variant="default"
                  elevated
                  loading={isSubmitting}
                  onClick={() => {
                    void form.handleSubmit();
                  }}
                  disabled={!canSubmit}
                >
                  {t('footer.submit')}
                </Button>
              )}
            />
          </>
        )}
      </DialogFooter>
    </Dialog>
  );
}
