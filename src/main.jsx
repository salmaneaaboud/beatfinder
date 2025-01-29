// Asegúrate de definir 'global' como 'window' si no está definido
if (typeof global === 'undefined') {
  var global = window;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";
import i18next from "i18next";
import { I18nextProvider } from 'react-i18next';

import { Provider } from 'react-redux';
import { store } from './redux/store';

i18next.init({
  resources: {
    es: { translation: global_es },
    en: { translation: global_en },
  },
  lng: 'es',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </StrictMode>
);
