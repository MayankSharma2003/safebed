import { useState, type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from "./translations/en.json";
import jpMessages from "./translations/jp.json";
import { LanguageContext } from "./languageContext";

const allMessages: Record<string, Record<string, string>> = {
  en: enMessages,
  ja: jpMessages,
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('ja');

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={allMessages[locale]}
        defaultLocale="ja"
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
