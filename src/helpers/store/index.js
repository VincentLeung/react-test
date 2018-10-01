import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'src/rootReducer';
import { initSagas } from 'src/rootSagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        loggerMiddleware
      )
    )
  );
  initSagas(sagaMiddleware);
  return store;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
