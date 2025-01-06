import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { createPrivateChat } from "../../chat/chatsThunks.ts";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../users/userSlice.ts";
import { toast } from "react-toastify";

interface Props {
  firstPersonId: string;
  secondPersonId: string;
}

const ChatButton: React.FC<Props> = ({ firstPersonId, secondPersonId }) => {
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
      sx={{ width: "fit-content" }}
      onClick={startChat}
      disabled={isLoading}
    >
      {isLoading ? "Загрузка..." : "Связаться с тренером"}
    </Button>
  );
};

export default ChatButton;
