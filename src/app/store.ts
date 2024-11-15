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
import { coursesReducer } from "../features/courses/coursesSlice.ts";
import { lessonsReducer } from "../features/lessons/lessonsSlice";
import { clientsReducer } from "../features/clients/clientSlice.ts";
import {adminClientsReducer} from "../features/admin/clients/adminClientsSlice.ts";

const usersPersistConfig = {
  key: "wingsfit:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  courses: coursesReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  lessons: lessonsReducer,
  clients: clientsReducer,
  adminClients: adminClientsReducer,
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
