import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { OneChat } from "../../../types/chatTypes.ts";

interface Props {
  chats: OneChat[];
  setSelectedChatId: (chatId: string) => void;
  selectedChatId: string | null;
}

const ChatsList: React.FC<Props> = ({
  chats,
  setSelectedChatId,
  selectedChatId,
}) => {
  return (
    <List sx={{ overflow: "auto" }}>
      {chats.map((chat) => (
        <ListItem
          key={chat._id}
          sx={{
            bgcolor:
              chat._id === selectedChatId ? "rgba(0, 0, 255, 0.1)" : "inherit",
          }}
        >
          <ListItemButton onClick={() => setSelectedChatId(chat._id)}>
            <ListItemText primary={chat.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatsList;
