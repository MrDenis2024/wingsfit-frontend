import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  FormHelperText,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";

interface Props {
  chatId: string;
}

const ChatForm: React.FC<Props> = () => {
  const [message, setMessage] = useState("");
  const [wordLimitExceeded, setWordLimitExceeded] = useState(false);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const wordCount = text.trim().split(/\s+/).length;

    if (wordCount <= 250) {
      setMessage(text);
      setWordLimitExceeded(false);
    } else {
      setWordLimitExceeded(true);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Grid
      component="form"
      sx={{
        display: "flex",
        padding: 2,
        mx: 2,
        borderRadius: "8px",
        boxShadow: 3,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        value={message}
        onChange={handleMessageChange}
        placeholder="Введите сообщение"
        multiline
        rows={isSmallScreen ? 1 : 2}
        sx={{
          "& .MuiInputBase-input::placeholder": {
            fontSize: { xs: "0.8rem", sm: "1rem" },
          },
        }}
      />
      {wordLimitExceeded && (
        <FormHelperText error>Максимум 250 слов!</FormHelperText>
      )}
      <IconButton
        disabled={wordLimitExceeded}
        type="submit"
        color="primary"
        sx={{ borderRadius: "50%" }}
      >
        <TelegramIcon />
      </IconButton>
    </Grid>
  );
};

export default ChatForm;
