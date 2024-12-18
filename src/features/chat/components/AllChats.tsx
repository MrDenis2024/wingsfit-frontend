import {Divider, Typography} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import {OneChat} from "../../../types/chatTypes.ts";
import ChatsList from "./ChatsList.tsx";

interface Props {
  chats: OneChat[];
  setSelectedChatId: (chatId: string) => void;
  selectedChatId: string | null;
  currentUserId?: string;
}

const AllChats: React.FC<Props> = ({
                                     chats,
                                     setSelectedChatId,
                                     selectedChatId,
                                     currentUserId,
                                   }) => {
  const groupChats = chats.filter(chat => chat.type === "group");
  const privateChats = chats.filter(chat => chat.type === "private");

  return (
    <Grid container direction="column" sx={{maxWidth: 300, backgroundColor: "#eeeeee", height: "100%"}}>
      <Grid sx={{borderBottom: "1px solid #ccc"}}>
        <Typography variant="h6" sx={{padding: 2}}>
          Чаты
        </Typography>
      </Grid>
      <Grid>
        <ChatsList
          chats={groupChats}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          title="Групповые чаты"
          renderChatTitle={(chat) => (chat.type === "group" ? chat.title : "")}
        />
      </Grid>
      <Divider/>
      <Grid>
        <ChatsList
          chats={privateChats}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          title="Приватные чаты"
          renderChatTitle={(chat) => {
            if (chat.type === "private") {
              const chatWith =
                chat.firstPerson._id === currentUserId ? chat.secondPerson : chat.firstPerson;
              return `${chatWith.firstName} ${chatWith.lastName}`;
            }
            return "";
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AllChats;
