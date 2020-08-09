import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combinedReducers } from "./reducers";
import { RootState } from "./types/reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  combinedReducers as any
);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
