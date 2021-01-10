import { createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from './reducers/tasks';

const store = createStore(persistReducer({ key: 'tasks', storage }, reducer));

const persistor = persistStore(store);

export { store, persistor };