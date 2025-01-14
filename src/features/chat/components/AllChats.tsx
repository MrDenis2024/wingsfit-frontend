import React, { useState } from "react";
import { Divider, InputAdornment, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { OneChat } from "../../../types/chatTypes.ts";
import ChatsList from "./ChatsList.tsx";
import SearchIcon from "@mui/icons-material/Search";

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const groupChats = chats.filter(
    (chat) =>
      chat.type === "group" && chat.title.toLowerCase().includes(searchTerm),
  );

  const privateChats = chats.filter(
    (chat) =>
      chat.type === "private" &&
      `${chat.firstPerson.firstName} ${chat.firstPerson.lastName}`
        .toLowerCase()
        .includes(searchTerm),
  );

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
      <Grid
        sx={{
          maxHeight: "250px",
          overflowY: "auto",
          marginTop: 2,
          scrollBehavior: "smooth",
        }}
      >
        <ChatsList
          chats={groupChats}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
          title="Групповые чаты"
          renderChatTitle={(chat) => (chat.type === "group" ? chat.title : "")}
        />
      </Grid>
      <Divider sx={{ marginY: 2 }} />{" "}
      <Grid
        sx={{ maxHeight: "250px", overflowY: "auto", scrollBehavior: "smooth" }}
      >
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
      <Divider sx={{ marginY: 2 }} />
    </Grid>
  );
};

export default AllChats;
