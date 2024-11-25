import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  chatId: string;
}

const ChatForm: React.FC<Props> = ({ chatId }) => {
  const [message, setMessage] = useState("");
  return (
    <Grid component="form" sx={{ display: "flex", padding: 2 }}>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <IconButton type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </Grid>
  );
};

export default ChatForm;
