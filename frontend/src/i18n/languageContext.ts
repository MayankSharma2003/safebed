import { createContext, useContext } from 'react';

type LanguageContextValue = {
  locale: string;
  setLocale: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  locale: 'ja',
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);
