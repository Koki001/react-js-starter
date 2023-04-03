import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
// Reducers
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUser,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
