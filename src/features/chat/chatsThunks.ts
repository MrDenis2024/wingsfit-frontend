import {createAsyncThunk} from "@reduxjs/toolkit";
import {GroupChat, PrivateChat} from "../../types/chatTypes.ts";
import {RootState} from "../../app/store.ts";
import {GlobalError} from "../../types/userTypes.ts";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const getGroupChats = createAsyncThunk<(GroupChat & { type: "group" })[], void, {
  state: RootState;
  rejectValue: GlobalError
}>(
  'chats/getGroupChats',
  async (_, {rejectWithValue}) => {
    try {
      const {data: groupChats} = await axiosApi.get<GroupChat[]>("/chats/groupChats");
      return groupChats.map((chat) => ({
        ...chat,
        type: "group",
      }));
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const getPrivateChats = createAsyncThunk<(PrivateChat & { type: "private" })[], void, {
  rejectValue: GlobalError
}>(
  'chats/getPrivateChats',
  async (_, {rejectWithValue}) => {
    try {
      const {data: privateChats} = await axiosApi.get<PrivateChat[]>('/chats/privateChats');
      return privateChats.map((chat) => ({
        ...chat,
        type: "private",
      }));
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data); // Return the error response
      }
      throw error;
    }
  }
);