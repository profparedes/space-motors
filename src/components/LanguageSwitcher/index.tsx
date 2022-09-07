import { memo } from 'react';

import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <button type="button" onClick={() => i18n.changeLanguage('en')}>
        en
      </button>
      <button type="button" onClick={() => i18n.changeLanguage('pt-BR')}>
        pt-BR
      </button>
      <p>{i18n.resolvedLanguage}</p>
    </div>
  );
};

export default memo(LanguageSwitcher);
