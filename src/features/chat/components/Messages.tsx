import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MessagesList from "./MessagesList.tsx";
import ChatForm from "./ChatForm.tsx";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";
import { Message } from "../../../types/chatTypes.ts";
import { wsApiURL } from "../../../constants.ts";

interface MessagesProps {
  chatId: string | null;
  chatType: string;
  chatTitle: string;
}

const Messages: React.FC<MessagesProps> = ({ chatId, chatType, chatTitle }) => {
  const user = useAppSelector(selectUser);
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    setMessages([]);

    if (ws.current) {
      ws.current.close();
    }

    if (chatId && chatType) {
      ws.current = new WebSocket(`${wsApiURL}/chat/${chatId}/${chatType}`);

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "CHAT_MESSAGES" && data.payload.chatId === chatId) {
          setMessages(data.payload.latestMessages);
        }
        if (data.type === "NEW_MESSAGE" && data.payload.chatId === chatId) {
          setMessages((prevMessages) => [...prevMessages, data.payload]);
        }
      };

      ws.current.onopen = () => {
        if (!user) {
          return;
        }
        ws.current!.send(
          JSON.stringify({ type: "LOGIN", payload: user.token }),
        );
        ws.current!.send(
          JSON.stringify({
            type: "JOIN_CHAT",
            payload: { chatId: chatId, chatType: chatType },
          }),
        );

        ws.current!.onerror = () => {
          if (ws.current) {
            ws.current.send(
              JSON.stringify({
                type: "ERROR",
                payload: "Что-то пошло не так!",
              }),
            );
          }
        };

        ws.current!.onclose = () => {};
      };

      return () => {
        if (ws.current) {
          ws.current.close();
          ws.current = null;
        }
      };
    }
  }, [chatId, chatType, user]);

  const sendMessage = (message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "SEND_MESSAGE",
          payload: { message },
        }),
      );
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        _id: Date.now().toString(),
        chatId: chatId || "",
        author: {
          _id: user?._id || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          avatar: user?.avatar || "",
        },
        message,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const formattedMessages = messages.map((msg) => ({
    id: msg._id,
    author: `${msg.author.firstName} ${msg.author.lastName}`,
    message: msg.message,
    createdAt: msg.createdAt,
    avatar: msg.author.avatar,
  }));

  const getAvatarText = (author: string) => {
    const names = author.split(" ");
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase();
  };

  const messagesWithAvatars = formattedMessages.map((msg) => ({
    ...msg,
    avatar: msg.avatar || getAvatarText(msg.author),
  }));

  return (
    <Grid
      maxWidth="lg"
      sx={{
        px: 0,
        py: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid #ddd",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          padding: "16px",
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1.25rem" },
            textAlign: {
              xs: "center",
              sm: "center",
              md: "left",
            },
          }}
        >
          {chatId ? `Чат с ${chatTitle}` : "Чат"}
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        {chatId ? (
          <MessagesList messages={messagesWithAvatars} />
        ) : (
          <Typography>Выберите чат, чтобы просмотреть сообщения</Typography>
        )}
      </Box>
      {chatId && <ChatForm chatId={chatId} onSendMessage={sendMessage} />}
    </Grid>
  );
};

export default Messages;
