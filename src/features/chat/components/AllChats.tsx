import { Typography } from "@mui/material";
import React from "react";
import ChatsList from "./ChatsList.tsx";
import Grid from "@mui/material/Grid2";
import { OneChat } from "../../../types/chatTypes.ts";

interface Props {
  chats: OneChat[];
  setSelectedChatId: (chatId: string) => void;
  selectedChatId: string | null;
}

const AllChats: React.FC<Props> = ({
  chats,
  setSelectedChatId,
  selectedChatId,
}) => {
  return (
    <Grid>
      <Typography variant="h4" textAlign="center">
        All chats
      </Typography>
      <ChatsList
        chats={chats}
        setSelectedChatId={setSelectedChatId}
        selectedChatId={selectedChatId}
      />
    </Grid>
  );
};

export default AllChats;
