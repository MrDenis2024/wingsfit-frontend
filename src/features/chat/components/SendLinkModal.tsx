import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Modal from "../../../UI/Modal/Modal.tsx";
import { IGroup } from "../../../types/groupTypes.ts";

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
  onSend: (groupId: string, lessonUrl: string) => void;
  handleClose: VoidFunction; // Pass video URL to parent
  isOpen: boolean;
  group: IGroup;
}

const SendLinkModal: React.FC<Props> = ({
  group,
  onSend,
  isOpen,
  handleClose,
}) => {
  const [lessonUrl, setLessonUrl] = useState("");

  const handleSend = () => {
    if (isValidUrl(lessonUrl)) {
      onSend(group._id, lessonUrl);
      setLessonUrl("");
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
      <Modal
        show={isOpen}
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
            value={lessonUrl}
            type="url"
            onChange={(e) => setLessonUrl(e.target.value)}
            error={!!lessonUrl && !isValidUrl(lessonUrl)}
            helperText={
              !!lessonUrl && !isValidUrl(lessonUrl)
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
