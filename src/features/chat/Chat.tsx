import { useEffect, useState } from "react";
import AllChats from "./components/AllChats.tsx";
import Messages from "./components/Messages.tsx";
import { Container, Box, IconButton, Drawer } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectGroupChats, selectPrivateChats } from "./chatsSlice.ts";
import { getGroupChats, getPrivateChats } from "./chatsThunks.ts";
import { selectUser } from "../users/userSlice.ts";
import { OneChat } from "../../types/chatTypes.ts";
import MenuIcon from "@mui/icons-material/Menu";

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(selectUser);
  const groupChats = useAppSelector(selectGroupChats);
  const privateChats = useAppSelector(selectPrivateChats);

  useEffect(() => {
    dispatch(getGroupChats());
    dispatch(getPrivateChats());
  }, [dispatch]);

  const chats: OneChat[] = [...groupChats, ...privateChats];

  const selectedChat = chats.find((chat) => chat._id === selectedChatId);

  const chatTitle = (() => {
    if (!selectedChat) return "Чат";

    if (selectedChat.type === "group") {
      return selectedChat.title || "Групповой чат";
    }

    const isCurrentUserFirstPerson =
      selectedChat.firstPerson &&
      selectedChat.firstPerson._id === currentUserId?._id;

    const firstName = isCurrentUserFirstPerson
      ? selectedChat.secondPerson?.firstName
      : selectedChat.firstPerson?.firstName;

    const lastName = isCurrentUserFirstPerson
      ? selectedChat.secondPerson?.lastName
      : selectedChat.firstPerson?.lastName;

    return `${firstName || "Неизвестно"} ${lastName || "Неизвестно"}`;
  })();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", padding: 0 }}>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "relative",
          zIndex: 2,
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ position: "absolute", top: 42, left: 16, zIndex: 3 }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          height: "100%",
          border: "1px solid #ddd",
          overflow: "hidden",
        }}
      >
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        >
          <Box
            sx={{
              width: 200,
              height: "100vh",
            }}
          >
            <AllChats
              chats={chats}
              setSelectedChatId={setSelectedChatId}
              selectedChatId={selectedChatId}
              currentUserId={currentUserId?._id}
            />
          </Box>
        </Drawer>
        <Box
          sx={{
            width: { sm: "30%", xs: "100%" },
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            display: { xs: "none", sm: "block" },
          }}
        >
          <AllChats
            chats={chats}
            setSelectedChatId={setSelectedChatId}
            selectedChatId={selectedChatId}
            currentUserId={currentUserId?._id}
          />
        </Box>

        <Box
          sx={{
            width: { sm: "70%", xs: "100%" },
            overflowY: "auto",
          }}
        >
          <Messages chatId={selectedChatId} chatTitle={chatTitle || "Чат"} />
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
