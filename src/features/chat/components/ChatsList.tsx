import React from "react";
import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {OneChat} from "../../../types/chatTypes.ts";

interface Props {
  chats: OneChat[];
  setSelectedChatId: (chatId: string) => void;
  selectedChatId: string | null;
  title: string
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
      <Typography variant="body1" fontWeight="bold" sx={{padding: "8px 16px", color: "#333"}}>
        ● {title}
      </Typography>
      <Divider/>
      <List disablePadding>
        {chats.map((chat) => (
          <ListItem
            key={chat._id}
            onClick={() => setSelectedChatId(chat._id)}
            sx={{
              backgroundColor: selectedChatId === chat._id ? "#73c6d9" : "transparent",
              "&:hover": {backgroundColor: "#73c6d9"},
            }}
          >
            <ListItemText primary={renderChatTitle(chat)}/>
          </ListItem>
        ))}
      </List>
    </>);
};

export default ChatsList;
