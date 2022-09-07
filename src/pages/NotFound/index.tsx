import { memo, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import useTitle from 'hooks/useTitle';

const NotFound: React.FC = () => {
  const { t, i18n } = useTranslation();
  const setTitle = useTitle();

  useEffect(() => {
    setTitle(t('not-found.title'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  return <h1>{t('not-found.title')}</h1>;
};

export default memo(NotFound);
