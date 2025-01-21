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
              onClick={() => {
                if (chat.type === "group" && !chat.disabled) {
                  setSelectedChatId(chat._id);
                } else if (chat.type === "private") {
                  setSelectedChatId(chat._id);
                }
              }}
              sx={{
                backgroundColor:
                  selectedChatId === chat._id ? "#56cad5" : "transparent",
                "&:hover": {
                  backgroundColor:
                    chat.type === "group" && chat.disabled
                      ? "transparent"
                      : "#56cad5",
                },
                cursor:
                  chat.type === "group" && chat.disabled
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <ListItemText
                primary={
                  <>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "1rem" },
                        color:
                          chat.type === "group" && chat.disabled
                            ? "gray"
                            : "inherit",
                      }}
                    >
                      {renderChatTitle(chat)}
                    </Typography>
                    {chat.type === "group" && chat.disabled && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontSize: { xs: "0.4rem", sm: "0.6rem" },
                          color: "red",
                        }}
                      >
                        Чат для вас недоступен
                      </Typography>
                    )}
                  </>
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
