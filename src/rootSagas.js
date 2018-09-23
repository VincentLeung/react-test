import { dataSagas } from 'data/sagas';

const sagas = [
  ...dataSagas
];

export const initSagas = (sagaMiddleware) =>
  sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware))
