import {GroupChat, PrivateChat} from "../../types/chatTypes.ts";
import {createSlice} from "@reduxjs/toolkit";
import {getGroupChats, getPrivateChats} from "./chatsThunks.ts";

interface ChatsState {
  groupChats: GroupChat[];
  groupChatsFetching: boolean;
  privateChats: PrivateChat[];
  privateChatsFetching: boolean;
}

const initialState: ChatsState = {
  groupChats: [],
  groupChatsFetching: false,
  privateChats: [],
  privateChatsFetching: false,
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
      .addCase(getPrivateChats.fulfilled, (state, {payload: privateChats}) => {
        state.privateChats = privateChats;
      })
      .addCase(getPrivateChats.rejected, (state) => {
        state.privateChatsFetching = false;
      });
  },
  selectors: {
    selectGroupChats: (state) => state.groupChats,
    selectGroupChatsFetching: (state) => state.groupChatsFetching,
    selectPrivateChats: (state) => state.privateChats,
    selectPrivateChatsFetching: (state) => state.privateChatsFetching,
  }
});

export const chatsReducer = chatsSlice.reducer;

export const {
  selectGroupChats,
  selectPrivateChats,
} = chatsSlice.selectors;