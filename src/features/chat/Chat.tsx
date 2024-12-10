import { useState } from "react";
import Grid from "@mui/material/Grid2";
import AllChats from "./components/AllChats.tsx";
import Messages from "./components/Messages.tsx";
import { OneChat } from "../../types/chatTypes.ts";

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats] = useState<OneChat[]>([
    {
      _id: "123",
      title: "Anton",
    },
    {
      _id: "1232",
      title: "Группа 1",
      group: "123123123",
    },
  ]);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="space-around"
      sx={{ height: "80vh" }}
    >
      <Grid sx={{ width: "30%", borderRight: "1px solid #000000" }}>
        <AllChats
          chats={chats}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
        />
      </Grid>
      <Grid sx={{ width: "60%" }}>
        <Messages chatId={selectedChatId} />
      </Grid>
    </Grid>
  );
};

export default Chat;
