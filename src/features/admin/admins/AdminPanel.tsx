import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectFetchingTrainers,
  selectTrainers,
} from "../../trainers/trainersSlice.ts";
import { getTrainers } from "../../trainers/trainersThunks.ts";
import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import { fetchCourseTypes } from "../../CourseTypes/CourseTypesThunks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import { fetchClients } from "../../clients/clientThunk.ts";
import { selectClients } from "../../clients/clientSlice.ts";
import { fetchAllGroups } from "../../groups/groupsThunk.ts";
import { selectGroups } from "../../groups/groupsSlice.ts";
import AdminPanelItem from "./components/AdminPanelItem.tsx";
import { selectCourses } from "../../courses/coursesSlice.ts";
import { fetchCourses } from "../../courses/coursesThunks.ts";
import { selectUsers } from "../../users/userSlice.ts";
import { fetchUsers } from "../../users/userThunk.ts";

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const trainers = useAppSelector(selectTrainers);
  const coursesType = useAppSelector(selectCourseTypes);
  const isFetching = useAppSelector(selectFetchingTrainers);
  const clients = useAppSelector(selectClients);
  const groups = useAppSelector(selectGroups);
  const courses = useAppSelector(selectCourses);
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(fetchCourseTypes());
    dispatch(fetchClients());
    dispatch(fetchAllGroups());
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: "100%" }}>
      Панель с информацией не найден!
    </Alert>
  );
  if (isFetching) {
    content = <LoadingIndicator />;
  } else if (trainers.length > 0) {
    content = (
      <AdminPanelItem
        trainers={trainers}
        coursesType={coursesType}
        clients={clients}
        groups={groups}
        courses={courses}
        users={users}
      />
    );
  }
  return (
    <Grid>
      <Grid>{content}</Grid>
    </Grid>
  );
};

export default AdminPanel;
