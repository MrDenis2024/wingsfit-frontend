import {ChatMessages, GroupChat, PrivateChat} from "../../types/chatTypes.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchMessages, getGroupChats, getPrivateChats} from "./chatsThunks.ts";

interface ChatsState {
  groupChats: GroupChat[];
  groupChatsFetching: boolean;
  privateChats: PrivateChat[];
  privateChatsFetching: boolean;
  chatMessages: ChatMessages;
  chatMessagesLoading: boolean;

}

const initialState: ChatsState = {
  groupChats: [],
  groupChatsFetching: false,
  privateChats: [],
  privateChatsFetching: false,
  chatMessages: {},
  chatMessagesLoading: false,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupChats.pending, (state) => {
        state.groupChatsFetching = true;
      })
      .addCase(getGroupChats.fulfilled, (state, {payload: groupChats}) => {
        state.groupChats = groupChats;
        state.groupChatsFetching = false;
      })
      .addCase(getGroupChats.rejected, (state) => {
        state.groupChatsFetching = false;
      });
    builder
      .addCase(getPrivateChats.pending, (state) => {
        state.privateChatsFetching = true;
      })
      .addCase(
        getPrivateChats.fulfilled,
        (state, {payload: privateChats}) => {
          state.privateChats = privateChats;
        },
      )
      .addCase(getPrivateChats.rejected, (state) => {
        state.privateChatsFetching = false;
      });
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.chatMessagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, {payload}) => {
        const {chatId, messages} = payload;
        if (!state.chatMessages[chatId]) {
          state.chatMessages[chatId] = {messages: [], hasMore: true, error: null};
        }
        if (messages.length > 0) {
          state.chatMessages[chatId].messages.unshift(...messages);
          state.chatMessages[chatId].hasMore = messages.length > 0;
        }
        state.chatMessagesLoading = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.chatMessagesLoading = false;
      });
  },
  selectors: {
    selectGroupChats: (state) => state.groupChats,
    selectGroupChatsFetching: (state) => state.groupChatsFetching,
    selectPrivateChats: (state) => state.privateChats,
    selectPrivateChatsFetching: (state) => state.privateChatsFetching,
    selectChatMessages: (state) => state.chatMessages,
  },
});

export const chatsReducer = chatsSlice.reducer;

export const {selectGroupChats, selectPrivateChats, selectChatMessages} = chatsSlice.selectors;
