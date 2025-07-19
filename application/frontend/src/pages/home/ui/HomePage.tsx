import { useTranslation } from '~/shared/locale/index';

export function HomePage() {
  const { t } = useTranslation('pages/home', {
    keyPrefix: 'HomePage',
  });

  return <p>{t('hello')}</p>;
}
