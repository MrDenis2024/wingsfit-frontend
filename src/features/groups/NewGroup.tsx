import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectGroupCreate } from "./groupsSlice.ts";
import { GroupMutation } from "../../types/groupTypes.ts";
import { createGroup } from "./groupsThunk.ts";
import { Typography } from "@mui/material";
import GroupForm from "./components/GroupForm.tsx";

const NewGroup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectGroupCreate);

  const onFormSubmit = async (groupMutation: GroupMutation) => {
    try {
      await dispatch(createGroup(groupMutation));
      navigate("/");
    } catch (error) {
      console.error("Course creation error", error);
    }
  };
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New Group
      </Typography>
      <GroupForm onSubmit={onFormSubmit} isLoading={isCreating} />
    </>
  );
};

export default NewGroup;
