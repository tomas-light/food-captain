import { type FC, type PropsWithChildren, useEffect, useState } from 'react';
import { i18nInit } from '~/shared/locale';

export const TranslatesProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    void i18nInit().then(() => setConfigured(true));
  }, []);

  if (!configured) {
    return null;
  }

  return children;
};
