import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/userSlice.ts";
import {
  selectGroupUpdateLoading,
  selectOneGroup,
  selectOneGroupLoading,
} from "./groupsSlice.ts";
import { editGroup, getOneGroup } from "./groupsThunk.ts";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid2";
import { Container, Typography } from "@mui/material";
import GroupForm from "./components/GroupForm.tsx";
import { GroupMutation } from "../../types/groupTypes.ts";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";

const EditGroup = () => {
  const { id } = useParams() as { id: string };
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFetching = useAppSelector(selectOneGroupLoading);
  const group = useAppSelector(selectOneGroup);
  const isUpdating = useAppSelector(selectGroupUpdateLoading);

  useEffect(() => {
    dispatch(getOneGroup(id));
  }, [dispatch, id]);

  const onSubmit = async (group: GroupMutation) => {
    try {
      await dispatch(editGroup({ id, group })).unwrap();
      navigate("/");
      toast.success("Группа успешна обновлена");
    } catch {
      toast.error("Не удалось обновить группу");
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Grid>
        <Typography variant={"h4"} sx={{ marginBottom: "20px" }}>
          Редактирование группы
        </Typography>
        {isFetching ? (
          <LoadingIndicator />
        ) : (
          group &&
          (group.course.user === user?._id ? (
            <GroupForm
              onSubmit={onSubmit}
              isLoading={isUpdating}
              existingGroup={group}
            />
          ) : (
            <Typography variant="h6" color="error">
              У вас нет прав на редактирование этой группы.
            </Typography>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default EditGroup;
