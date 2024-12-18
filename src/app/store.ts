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
import { trainersReducer } from "../features/trainers/trainersSlice.ts";
import { courseTypesReducer } from "../features/CourseTypes/CourseTypesSlice.ts";
import { adminClientsReducer } from "../features/admin/clients/adminClientsSlice.ts";
import { adminsReducer } from "../features/admin/admins/adminSlice.ts";
import { groupsReducer } from "../features/groups/groupsSlice.ts";
import { reviewReducer } from "../features/reviewForm/reviewSlice.ts";
import { trainerStatisticReducer } from "../features/trainers/statistic/trainerStatisticSlice.ts";
import { chatsReducer } from "../features/chat/chatsSlice.ts";

const usersPersistConfig = {
  key: "wingsfit:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  groups: groupsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  lessons: lessonsReducer,
  clients: clientsReducer,
  trainers: trainersReducer,
  adminClients: adminClientsReducer,
  admins: adminsReducer,
  review: reviewReducer,
  trainerStatistic: trainerStatisticReducer,
  chats: chatsReducer,
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
