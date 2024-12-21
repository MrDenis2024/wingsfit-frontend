import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { OneChat } from "../../../types/chatTypes.ts";

interface Props {
  chats: OneChat[];
  setSelectedChatId: (chatId: string) => void;
  selectedChatId: string | null;
  title: string;
  renderChatTitle: (chat: OneChat) => string;
}

const ChatsList: React.FC<Props> = ({
  chats,
  setSelectedChatId,
  selectedChatId,
  title,
  renderChatTitle,
}) => {
  return (
    <>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem" },
          padding: "8px 16px",
          color: "#333",
        }}
      >
        ● {title}
      </Typography>
      <Divider />
      <Box
        sx={{
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        <List disablePadding>
          {chats.map((chat) => (
            <ListItem
              key={chat._id}
              onClick={() => setSelectedChatId(chat._id)}
              sx={{
                backgroundColor:
                  selectedChatId === chat._id ? "#56cad5" : "transparent",
                "&:hover": { backgroundColor: "#56cad5" },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "1rem" },
                    }}
                  >
                    {renderChatTitle(chat)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default ChatsList;
