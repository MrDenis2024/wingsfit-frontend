import React, {useEffect} from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ChatForm from "./ChatForm.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectChatMessages} from "../chatsSlice.ts";
import {fetchMessages} from "../chatsThunks.ts";
import MessagesList from "./MessagesList.tsx";

interface Props {
  chatId: string | null;
}

const Messages: React.FC<Props> = ({ chatId }) => {
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(selectChatMessages);

  useEffect(() => {
    if (chatId) {
      const currentChatMessages = chatMessages[chatId];
      if (!currentChatMessages || currentChatMessages.messages.length === 0) {
        dispatch(fetchMessages({ chatId, page: 0, limit: 20 }));
      }
    }
  }, [chatId, dispatch, chatMessages]);

  if (!chatId) {
    return (
      <Grid sx={{ textAlign: "center" }}>
        <Typography variant="h6">Выберите чат, чтобы начать общение</Typography>
      </Grid>
    );
  }

  const messages = chatMessages[chatId]?.messages || [];

  return (
    <Grid>
      <Grid sx={{ height: "67vh" }}>
        <MessagesList messages={messages} />
      </Grid>
      <ChatForm chatId={chatId} />
    </Grid>
  );
};

export default Messages;
