import { createSlice } from "@reduxjs/toolkit";
import {getUnreadMessages} from "./notificationThunk.ts";
import {Message} from "../../types/chatTypes.ts";

interface notificationState {
    unreadMessages: Message[],
    notifications: string[];
    notificationsLoading: boolean;
}

const initialState: notificationState = {
    unreadMessages: [],
    notifications: [],
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
    },
    selectors: {
        selectNotification: (state) => state.notifications,
        selectUnreadMessages: (state) => state.unreadMessages,
        selectNotificationLoading: (state) => state.notificationsLoading
    },
});

export const notificationsReducer = notificationSlice.reducer;

export const { selectNotification, selectNotificationLoading, selectUnreadMessages } = notificationSlice.selectors;