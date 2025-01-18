import { createSlice } from "@reduxjs/toolkit";
import {getCoursesToday, getEndedSubscription, getUnreadMessages} from "./notificationThunk.ts";
import {Message} from "../../types/chatTypes.ts";
import {CourseToday, EndedSubscription} from "../../types/notificationTypes.ts";

interface notificationState {
    unreadMessages: Message[],
    coursesToday: CourseToday[];
    endedSubscriptions: EndedSubscription[];
    notificationsLoading: boolean;
}

const initialState: notificationState = {
    unreadMessages: [],
    coursesToday: [],
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
            .addCase(getUnreadMessages.fulfilled, (state, { payload: groupChats }) => {
                state.unreadMessages = groupChats;
                state.notificationsLoading = false;
            })
            .addCase(getUnreadMessages.rejected, (state) => {
                state.notificationsLoading = false;
            });
        builder
            .addCase(getCoursesToday.pending, (state) => {
                state.notificationsLoading = true;
            })
            .addCase(getCoursesToday.fulfilled, (state, { payload: coursesToday }) => {
                state.coursesToday = coursesToday;
                state.notificationsLoading = false;
            })
            .addCase(getCoursesToday.rejected, (state) => {
                state.notificationsLoading = false;
            });
        builder
            .addCase(getEndedSubscription.pending, (state) => {
                state.notificationsLoading = true;
            })
            .addCase(getEndedSubscription.fulfilled, (state, { payload: endedSubscriptions }) => {
                state.endedSubscriptions = endedSubscriptions;
                console.log(endedSubscriptions);
                state.notificationsLoading = false;
            })
            .addCase(getEndedSubscription.rejected, (state) => {
                state.notificationsLoading = false;
            });
    },
    selectors: {
        selectUnreadMessages: (state) => state.unreadMessages,
        selectNotificationLoading: (state) => state.notificationsLoading,
        selectCoursesToday: (state)=> state.coursesToday,
    },
});

export const notificationsReducer = notificationSlice.reducer;

export const { selectNotificationLoading, selectUnreadMessages, selectCoursesToday } = notificationSlice.selectors;