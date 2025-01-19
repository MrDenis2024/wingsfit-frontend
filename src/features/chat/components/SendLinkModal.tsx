import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Modal from "../../../UI/Modal/Modal.tsx";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#FFFFFF",
    borderRadius: "4px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#B3E5FC",
  },
  marginBottom: "20px",
  width: "100%",
});

const CustomButton = styled(Button)({
  backgroundColor: "#56cad5",
  color: "#FFFFFF",
  padding: "10px 0",
  width: "100%",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#0097a7",
  },
});

interface Props {
  onSend: (videoUrl: string) => void; // Pass video URL to parent
}

const SendLinkModal: React.FC<Props> = ({ onSend }) => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = () => {
    if (isValidUrl(videoUrl)) {
      onSend(videoUrl);
      setVideoUrl("");
      handleClose();
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: "#26c6da",
          fontSize: { xs: "8px", sm: "12px" },
          color: "#333",
        }}
      >
        Отправить ссылку
      </Button>
      <Modal
        show={open}
        onClose={handleClose}
        title=""
        maxWidth={500}
        backgroundColor={"#e0f7fa"}
      >
        <Box sx={{ textAlign: "center", padding: "16px" }}>
          <StyledTextField
            variant="outlined"
            required
            placeholder="https://example.com/your-video-link"
            value={videoUrl}
            type="url"
            onChange={(e) => setVideoUrl(e.target.value)}
            error={!!videoUrl && !isValidUrl(videoUrl)}
            helperText={
              !!videoUrl && !isValidUrl(videoUrl)
                ? "Введите корректный URL"
                : ""
            }
          />
          <CustomButton onClick={handleSend}>Начать занятие</CustomButton>
        </Box>
      </Modal>
    </>
  );
};

export default SendLinkModal;
