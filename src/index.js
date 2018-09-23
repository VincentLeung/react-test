import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import 'semantic-ui-css/semantic.min.css';

import config from 'config';

import { configureStore } from 'helpers';
import { App } from 'scenes';
import i18n from 'i18n';
import { setLanguage } from 'i18n';

// setup fake backend
import { configureFakeBackend } from 'helpers';
if (config.mockBackend) {
  configureFakeBackend();
}

const store = configureStore();
const i18nextExt = Object.assign(
  { lng: 'en-US', flag: 'us', lngKey: 'Country.en-US' },
  JSON.parse(localStorage.getItem('i18nextExt'))
);
setLanguage(i18nextExt.lng, i18nextExt.flag, i18nextExt.lngKey);

render(
    <Provider store={store}>
      <I18nextProvider i18n={ i18n }>
        <App />
      </I18nextProvider>
    </Provider>,
    document.getElementById('app')
);
