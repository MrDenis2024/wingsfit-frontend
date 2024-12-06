import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {selectGroupCreate, selectGroupError} from "./groupsSlice.ts";
import { GroupMutation } from "../../types/groupTypes.ts";
import { createGroup } from "./groupsThunk.ts";
import { Typography } from "@mui/material";
import GroupForm from "./components/GroupForm.tsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const NewGroup = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectGroupCreate);
  const error = useAppSelector(selectGroupError)
  const navigate = useNavigate();

  const onFormSubmit = async (groupMutation: GroupMutation) => {
    try {
      await dispatch(createGroup(groupMutation));
      if(!error?.error){
        toast.success("Группа успешно создана!");
        setTimeout(()=>{
          navigate('/main')
        },2500)
      }
    } catch (error) {
      console.error("Course creation error", error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.error);
    }
  }, [error]);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New Group
      </Typography>
      <GroupForm onSubmit={onFormSubmit} isLoading={isCreating}/>
    </>
  );
};

export default NewGroup;
