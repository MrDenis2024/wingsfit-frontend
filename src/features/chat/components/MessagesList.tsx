import React from "react";
import { List, ListItem, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Message {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  avatar: string;
}

interface MessagesListProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <Grid sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <List
        sx={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          flexGrow: 1,
        }}
      >
        {messages.map((msg) => (
          <ListItem key={msg.id} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={msg.avatar}
              alt={msg.author}
              sx={{
                width: { xs: 27, sm: 32 },
                height: { xs: 27, sm: 32 },
                marginRight: { xs: 1, sm: 2 },
              }}
            />
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "70%",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "transparent",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: { xs: 3, sm: 2 },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                >
                  {msg.author}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.875rem" },
                    color: "gray",
                    lineHeight: 1.5,
                  }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </Typography>
              </Grid>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
              >
                {msg.message}
              </Typography>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default MessagesList;
