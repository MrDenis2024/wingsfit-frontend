import React from "react";
import { List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Message } from "../../../types/chatTypes.ts";

interface Props {
  messages: Message[];
}

const MessagesList: React.FC<Props> = ({ messages }) => {
  return (
    <Grid sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h4" textAlign="center" sx={{ flexGrow: 1 }}>
        Messages
      </Typography>
      <List
        sx={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {messages.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              // justifyContent: msg.author === "Я" ? "flex-end" : "flex-start",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                // flexDirection: msg.author === "Я" ? "row" : "row-reverse",
                // bgcolor: msg.author === "Я" ? "lightblue" : "lightgray",
                p: "8px",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1">{msg.message}</Typography>
              <Typography
                variant="caption"
                sx={{
                  // ml: msg.author === "Я" ? 1 : 0,
                  // mr: msg.author === "Я" ? 0 : 1,
                  lineHeight: 1.5,
                }}
              >
                {/*{msg.author}, {new Date(msg.createdAt).toLocaleTimeString()}*/}
              </Typography>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default MessagesList;
