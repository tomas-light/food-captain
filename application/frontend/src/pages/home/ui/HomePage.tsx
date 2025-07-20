import { useEffect } from 'react';
import { getFakeDatabase } from '~/shared/fake-database/getFakeDatabase';
import { useTranslation } from '~/shared/locale/index';
import { useIngredientsQuery } from '~/entities/ingredient';

export function HomePage() {
  const { t } = useTranslation('pages/home', {
    keyPrefix: 'HomePage',
  });

  useIngredientsQuery();

  // useEffect(() => {
  //   void (async () => {
  //     await getFakeDatabase();
  //   })();
  // }, []);

  return <p>{t('hello')}</p>;
}
