import React, {useEffect, useRef, useState} from "react";
import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MessagesList from "./MessagesList.tsx";
import ChatForm from "./ChatForm.tsx";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/userSlice.ts";
import {IncomingMessage, Message} from "../../../types/chatTypes.ts";
import {apiURL, wsApiURL} from "../../../constants.ts";

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
    if (!user) return;
    setMessages([]);

    if (ws.current) {
      ws.current.close();
    }

    if (chatId && chatType && user._id) {
      ws.current = new WebSocket(`${wsApiURL}/chat/${chatId}/${chatType}/${user._id}`);

      ws.current.onopen = async () => {
        ws.current!.send(
          JSON.stringify({ type: "LOGIN", payload: user.token }),
        );
        await new Promise(r => setTimeout(r, 300));

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

        ws.current!.onmessage = (event) => {
          const data: IncomingMessage = JSON.parse(event.data);
          if (
            (data.type === "NEW_MESSAGE" &&
              (data.payload.privateChat === chatId || data.payload.groupChat === chatId))
          ) {
            if (data.payload.author._id !== user._id) {
              setMessages((prevMessages) => [...prevMessages, data.payload]);
            }
          } else if (data.type === "CHAT_MESSAGES" && data.payload.chatId === chatId) {
            setMessages(data.payload.latestMessages);
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
        privateChat: chatType === "private" ? chatId || undefined : undefined,
        groupChat: chatType === "group" ? chatId || undefined : undefined,
        author: {
          _id: user?._id || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          avatar: user?.avatar || "",
        },
        message,
        createdAt: new Date().toISOString(),
        isRead: {
          user: user?._id || "",
          read: false,
        },
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

  const getAvatarUrl = (avatarPath: string) => {
    return avatarPath ? `${apiURL}/${avatarPath}` : undefined;
  };

  const messagesWithAvatars = formattedMessages.map((msg) => ({
    ...msg,
    avatar: msg.avatar ? getAvatarUrl(msg.avatar) : getAvatarText(msg.author),
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
