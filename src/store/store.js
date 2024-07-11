// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './AuthSlice/AuthSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, 
      serializableCheck: false, 
    }),
});

const persistor = persistStore(store);

export { store, persistor };
