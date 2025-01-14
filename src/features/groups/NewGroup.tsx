import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectGroupCreate, selectGroupError } from "./groupsSlice.ts";
import { GroupMutation } from "../../types/groupTypes.ts";
import { createGroup } from "./groupsThunk.ts";
import { Container, Typography } from "@mui/material";
import GroupForm from "./components/GroupForm.tsx";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createGroupChat } from "../chat/chatsThunks.ts";
import { isGroup } from "../../constants.ts";

const NewGroup = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectGroupCreate);
  const error = useAppSelector(selectGroupError);
  const navigate = useNavigate();

  const onFormSubmit = async (groupMutation: GroupMutation) => {
    try {
      if (parseFloat(groupMutation.maxClients) < 1) {
        return toast.error(
          "Максимум клиентов для группы не может быть меньше 1!",
        );
      } else if (parseFloat(groupMutation.scheduleLength) < 0.5) {
        return toast.error(
          "Продолжительность занятия не может быть меньше 0.5 часа",
        );
      } else {
        const groupCreationResult = await dispatch(createGroup(groupMutation));
        if (
          !error?.error &&
          groupCreationResult.payload &&
          isGroup(groupCreationResult.payload)
        ) {
          toast.success("Группа успешно создана!");

          const groupId = groupCreationResult.payload._id;

          if (groupId) {
            await dispatch(createGroupChat({ groupId }));
            toast.success("Чат для группы успешно создан!");
            navigate("/");
          }
        }
      }
    } catch {
      toast.error("Произошла ошибка при создании группы. Попробуйте снова.");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.error);
    }
  }, [error]);

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Создать группу
      </Typography>
      <GroupForm onSubmit={onFormSubmit} isLoading={isCreating} />
    </Container>
  );
};

export default NewGroup;
