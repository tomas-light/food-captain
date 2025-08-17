import { useTranslation } from 'react-i18next';
import { useLanguage } from '~/shared/locale';
import { locales, type Locale } from '~/shared/locale';
import classes from './LanguageButton.module.scss';

export function LanguageButton() {
  const language = useLanguage() as Locale;
  const { i18n } = useTranslation();
  const currentIndex = locales.indexOf(language);

  return (
    <div
      className={classes.root}
      onClick={() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= locales.length) {
          nextIndex = 0;
        }

        const nextLanguage = locales.at(nextIndex);
        void i18n.changeLanguage(nextLanguage);
      }}
    >
      <div
        className={classes.overlap}
        {...(currentIndex === 0
          ? {
              ['data-at-the-left']: true,
            }
          : currentIndex === language.length - 1
            ? {
                ['data-at-the-right']: true,
              }
            : undefined)}
        style={{
          left: `calc(40px * ${currentIndex})`,
        }}
      />
      {locales.map((locale) => (
        <span key={locale}>{locale}</span>
      ))}
    </div>
  );
}
