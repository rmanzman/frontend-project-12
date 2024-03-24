import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import AuthProvider from './context/authProvider.jsx';
import resources from './locales/index.js';
import './index.css';

const userLanguage = localStorage.getItem('userLanguage');
const DEFAULT_LANGUAGE = userLanguage ?? 'ru';

const init = () => {
  const i18n = i18next.createInstance();
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: ['en', 'ru'],
    react: {
      useSuspense: true,
    },
  });

  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nextProvider>
    </React.StrictMode>
  );
};

export default init;
