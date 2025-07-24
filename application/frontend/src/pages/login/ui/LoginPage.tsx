import { LoginButton, useLoginMutation } from '~/features/login';
import { useTranslation } from '~/shared/locale';
import classes from './LoginPage.module.scss';

export function LoginPage() {
  const { t } = useTranslation('pages/login', {
    keyPrefix: 'LoginPage',
  });

  const { mutate: login } = useLoginMutation();

  return (
    <div className={classes.root}>
      <form
        action={(formData) => {
          login({
            email: formData.get('email')! as string,
            password: formData.get('password')! as string,
          });
        }}
      >
        <label htmlFor="email">{t('email.label')}</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder={t('email.placeholder')}
        />

        <label htmlFor="password">{t('password.label')}</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder={t('password.placeholder')}
        />

        <LoginButton type="submit" />
      </form>
    </div>
  );
}
