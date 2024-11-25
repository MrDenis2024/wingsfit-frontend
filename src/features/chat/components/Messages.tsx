import React, { useState } from "react";
import { Typography } from "@mui/material";
import MessagesList from "./MessagesList.tsx";
import Grid from "@mui/material/Grid2";
import ChatForm from "./ChatForm.tsx";
import { Message } from "../../../types/chatTypes.ts";

interface Props {
  chatId: string | null;
}

const Messages: React.FC<Props> = ({ chatId }) => {
  let messages;

  if (chatId === "123") {
    messages = [
      {
        author: "Иван Иванов",
        message: "Привет!",
        createdAt: "2024-11-21T10:00:00",
      },
      {
        author: "Я",
        message: "Привет, как дела?",
        createdAt: "2024-11-21T10:05:00",
      },
    ];
  } else {
    messages = [
      {
        author: "Иван Иванов",
        message: "Приsadвет!",
        createdAt: "2024-11-21T10:00:00",
      },
      {
        author: "Я",
        message: "Привет, как дasdела?",
        createdAt: "2024-11-21T10:05:00",
      },
    ];
  }

  const [messages1, setMessages1] = useState<Message[]>(messages);

  if (!chatId) {
    return (
      <Grid sx={{ textAlign: "center" }}>
        <Typography variant="h6">Выберите чат, чтобы начать общение</Typography>
      </Grid>
    );
  }

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
