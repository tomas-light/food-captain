import { useIngredientsQuery } from '~/entities/ingredient';
import { useTranslation } from '~/shared/locale/';

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
