import { useTranslation } from '~/shared/locale';
import { TranslatesProvider } from './config/TranslatesProvider';

export function App() {
  return (
    <TranslatesProvider>
      <Page />
    </TranslatesProvider>
  );
}

const Page = () => {
  const { t } = useTranslation('app', {
    keyPrefix: 'App',
  });

  return <p>{t('hello')}</p>;
};
