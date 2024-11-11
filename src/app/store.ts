import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersReducer } from "../features/users/userSlice";
import { lessonsReducer } from "../features/lessons/lessonsSlice";
import { clientsReducer } from "../features/clients/clientSlice.ts";

const usersPersistConfig = {
  key: "wingsfit:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  lessons: lessonsReducer,
  clients: clientsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
