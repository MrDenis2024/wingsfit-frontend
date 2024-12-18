import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import AllChats from "./components/AllChats.tsx";
import Messages from "./components/Messages.tsx";
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectGroupChats, selectPrivateChats} from "./chatsSlice.ts";
import {getGroupChats, getPrivateChats} from "./chatsThunks.ts";
import {selectUser} from "../users/userSlice.ts";
import {OneChat} from "../../types/chatTypes.ts";

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(selectUser);
  const groupChats = useAppSelector(selectGroupChats);
  const privateChats = useAppSelector(selectPrivateChats);

  useEffect(() => {
    dispatch(getGroupChats());
    dispatch(getPrivateChats());
  }, [dispatch]);

  const chats: OneChat[] = [...groupChats, ...privateChats];

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
        justifyContent="space-around"
        sx={{ height: "80vh" }}
      >
        <Grid sx={{ width: "30%" }}>
          <AllChats
            chats={chats}
            setSelectedChatId={setSelectedChatId}
            selectedChatId={selectedChatId}
            currentUserId={currentUserId?._id}
          />
        </Grid>
        <Grid sx={{ width: "60%" }}>
          <Messages chatId={selectedChatId} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
