import { createSlice } from "@reduxjs/toolkit";
import {
  getCoursesToday,
  getEndedSubscription,
  getStartedLessons,
  getUnreadMessages,
} from "./notificationThunk.ts";
import { MessageNotification } from "../../types/chatTypes.ts";
import {
  CourseToday,
  EndedSubscription,
} from "../../types/notificationTypes.ts";
import { Lesson } from "../../types/lessonTypes.ts";

interface notificationState {
  unreadMessages: MessageNotification[];
  coursesToday: CourseToday[];
  endedSubscriptions: EndedSubscription[];
  startedLessons: Lesson[];
  notificationsLoading: boolean;
}

const initialState: notificationState = {
  unreadMessages: [],
  coursesToday: [],
  startedLessons: [],
  endedSubscriptions: [],
  notificationsLoading: false,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnreadMessages.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(getUnreadMessages.fulfilled, (state, { payload: messages }) => {
        state.unreadMessages = messages;
        state.notificationsLoading = false;
      })
      .addCase(getUnreadMessages.rejected, (state) => {
        state.notificationsLoading = false;
      });
    builder
      .addCase(getCoursesToday.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(
        getCoursesToday.fulfilled,
        (state, { payload: coursesToday }) => {
          state.coursesToday = coursesToday;
          state.notificationsLoading = false;
        },
      )
      .addCase(getCoursesToday.rejected, (state) => {
        state.notificationsLoading = false;
      });
    builder
      .addCase(getEndedSubscription.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(
        getEndedSubscription.fulfilled,
        (state, { payload: endedSubscriptions }) => {
          state.endedSubscriptions = endedSubscriptions;
          state.notificationsLoading = false;
        },
      )
      .addCase(getEndedSubscription.rejected, (state) => {
        state.notificationsLoading = false;
      });
    builder
      .addCase(getStartedLessons.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(getStartedLessons.fulfilled, (state, { payload: lessons }) => {
        state.startedLessons = lessons;
        state.notificationsLoading = false;
      })
      .addCase(getStartedLessons.rejected, (state) => {
        state.notificationsLoading = false;
      });
  },
  selectors: {
    selectUnreadMessages: (state) => state.unreadMessages,
    selectNotificationLoading: (state) => state.notificationsLoading,
    selectCoursesToday: (state) => state.coursesToday,
    selectEndedSubscriptions: (state) => state.endedSubscriptions,
    selectStartedLessons: (state) => state.startedLessons,
  },
});

export const notificationsReducer = notificationSlice.reducer;

export const {
  selectUnreadMessages,
  selectNotificationLoading,
  selectCoursesToday,
  selectEndedSubscriptions,
  selectStartedLessons,
} = notificationSlice.selectors;
