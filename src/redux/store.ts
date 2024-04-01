import { configureStore } from '@reduxjs/toolkit';
import webReducers from './reducers';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profile'],
};

export const store = configureStore({
    reducer: {
        reducers: persistReducer(persistConfig, webReducers),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
