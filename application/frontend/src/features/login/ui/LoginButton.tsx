import type { ButtonHTMLAttributes } from 'react';
import { useTranslation } from '~/shared/locale';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function LoginButton(props: Props) {
  const { t } = useTranslation('features/login', {
    keyPrefix: 'LoginButton',
  });

  return <button {...props}>{t('login')}</button>;
}
