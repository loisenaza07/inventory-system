import React from 'react';
import { IntlProvider } from 'react-intl';
import enTranslations from '../lang/en.json'; // sesuaikan dengan path file terjemahan Anda

const messages = {
  en: enTranslations,
  // Tambahkan terjemahan untuk bahasa lain di sini
};

const IntlProviderWrapper = ({ children, locale = 'en' }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;
