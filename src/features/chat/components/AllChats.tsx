import React, { useState } from "react";
import {
  Divider,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { OneChat } from "../../../types/chatTypes.ts";
import ChatsList from "./ChatsList.tsx";
import TryIcon from "@mui/icons-material/Try";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";

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
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAppSelector(selectUser);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const groupChats = chats
    .filter(
      (chat) =>
        chat.type === "group" && chat.title.toLowerCase().includes(searchTerm),
    )
    .slice(0, 3);

  const privateChats = chats
    .filter(
      (chat) =>
        chat.type === "private" &&
        `${chat.firstPerson.firstName} ${chat.firstPerson.lastName}`
          .toLowerCase()
          .includes(searchTerm),
    )
    .slice(0, 3);

  return (
    <Grid
      container
      direction="column"
      sx={{
        py: 5,
        maxWidth: "lg",
        backgroundColor: "#dddfe3",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ borderBottom: "1px solid #ccc", padding: 2 }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: "0.8rem", sm: "1.50rem" } }}
        >
          Чаты
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Поиск"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: "#96ceda",
            borderRadius: "4px",
            maxWidth: "60%",
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                },
              },
            },
          }}
        />
      </Grid>
      <Grid sx={{ maxHeight: "150px", overflowY: "auto", marginTop: 2 }}>
        <ChatsList
          chats={groupChats}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          title="Групповые чаты"
          renderChatTitle={(chat) => (chat.type === "group" ? chat.title : "")}
        />
      </Grid>
      <Divider sx={{ marginY: 2 }} />{" "}
      <Grid sx={{ maxHeight: "150px", overflowY: "auto" }}>
        <ChatsList
          chats={privateChats}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          title="Приватные чаты"
          renderChatTitle={(chat) => {
            if (chat.type === "private") {
              const chatWith =
                chat.firstPerson._id === currentUserId
                  ? chat.secondPerson
                  : chat.firstPerson;
              return `${chatWith.firstName} ${chatWith.lastName}`;
            }
            return "";
          }}
        />
      </Grid>
      <Divider sx={{ marginY: 2 }} />{" "}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user?.role !== "client" && (
          <Button
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              justifyContent: "flex-start",
              width: "100%",
              padding: "10px 16px",
              color: "#333",
              textTransform: "none",
              borderRadius: "0px",
              backgroundColor: "#56cad5",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#4db8c5",
              },
            }}
          >
            Создать чат <TryIcon sx={{ ml: 1 }} />{" "}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default AllChats;
