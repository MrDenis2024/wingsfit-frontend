import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { createPrivateChat } from "../chatsThunks.ts";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../users/userSlice.ts";
import { toast } from "react-toastify";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  firstPersonId: string;
  secondPersonId: string;
  buttonText: string;
  children?: SxProps<Theme>;
}

const ChatButton: React.FC<Props> = ({
  firstPersonId,
  secondPersonId,
  buttonText,
  children,
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const startChat = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        createPrivateChat({ firstPersonId, secondPersonId }),
      ).unwrap();
      const userId = user?._id;
      if (userId) {
        navigate(`/${user?.role}/chats/${userId}`);
        toast.success("Чат создан!");
      } else {
        toast.error("ID пользователя недоступен!");
      }
    } catch {
      toast.error("Не удалось создать чат. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="success"
      onClick={startChat}
      disabled={isLoading}
      sx={children}
    >
      {isLoading ? "Загрузка..." : buttonText}
    </Button>
  );
};

export default ChatButton;
