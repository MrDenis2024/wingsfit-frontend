import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MessagesList from "./MessagesList.tsx";
import ChatForm from "./ChatForm.tsx";

interface MessagesProps {
  chatId: string | null;
  chatTitle: string;
}

const Messages = ({ chatId, chatTitle }: MessagesProps) => {
  const messages = [
    {
      id: "1",
      author: "Я",
      message: "Привет!",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
    {
      id: "2",
      author: "Другой пользователь",
      message: "Привет, как дела?",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
    {
      id: "1",
      author: "Я",
      message: "Привет!",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
    {
      id: "2",
      author: "Другой пользователь",
      message: "Привет, как дела?",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
    {
      id: "1",
      author: "Я",
      message: "Привет!",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
    {
      id: "2",
      author: "Другой пользователь",
      message: "Привет, как дела?",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
    {
      id: "1",
      author: "Я",
      message: "Привет!",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
    {
      id: "2",
      author: "Другой пользователь",
      message: "Привет, как дела?",
      createdAt: new Date().toISOString(),
      avatar: null,
    },
  ];

  const getAvatarText = (author: string) => {
    const names = author.split(" ");
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase();
  };

  const messagesWithAvatars = messages.map((msg) => ({
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
      {chatId && <ChatForm chatId={chatId} />}
    </Grid>
  );
};

export default Messages;
