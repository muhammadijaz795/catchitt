import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./reducers";
import isuploading from "./reducers/upload";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = persistReducer(persistConfig, combineReducers)

export const store = configureStore({
  reducer: {
    // isuploading,
    reducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)
