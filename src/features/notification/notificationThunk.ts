import {createAsyncThunk} from "@reduxjs/toolkit";
import { Message} from "../../types/chatTypes.ts";
import {RootState} from "../../app/store.ts";
import {GlobalError} from "../../types/userTypes.ts";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const getUnreadMessages = createAsyncThunk<
    Message[],
    void,
    {
        state: RootState;
        rejectValue: GlobalError;
    }
>("notifications/getUnreadMessages", async (_, { rejectWithValue }) => {
    try {
        const { data: groupChatsUnreadMessages } = await axiosApi.get<Message[]>("/chats/groupChatsUnreadMessages");
        const { data: privateChatsUnreadMessages } = await axiosApi.get<Message[]>("/chats/privateChatsUnreadMessages");
        const messages = groupChatsUnreadMessages.concat(privateChatsUnreadMessages);

        return messages;
    } catch (error) {
        if (
            isAxiosError(error) &&
            error.response &&
            error.response.status === 400
        ) {
            return rejectWithValue(error.response.data);
        }
        throw error;
    }
});

