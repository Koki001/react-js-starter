import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
// Reducers
import userReducer from "./slices/userSlice";
import progressReducer from "./slices/progressSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedUser = persistReducer(persistConfig, userReducer);
const persistedProgress = persistReducer(persistConfig, progressReducer);

export const store = configureStore({
  reducer: {
    user: persistedUser,
    progress: persistedProgress,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);