import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/userSlice.ts";
import { selectCourses } from "../courses/coursesSlice.ts";
import { selectGroups } from "./groupsSlice.ts";
import { fetchCourses } from "../courses/coursesThunks.ts";
import { fetchAllGroups } from "./groupsThunk.ts";
import Grid from "@mui/material/Grid2";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GroupCards from "./components/GroupCards.tsx";
import { fetchTrainerLessons } from "../lessons/lessonsThunk.ts";

const GroupManagement = () => {
  const user = useAppSelector(selectUser);
  const courses = useAppSelector(selectCourses);
  const groups = useAppSelector(selectGroups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      void dispatch(fetchCourses(user._id));
      void dispatch(fetchAllGroups());
      void dispatch(fetchTrainerLessons(user._id));
    }
  }, [dispatch, user]);

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 3 }}
      >
        <Typography variant="h4">Мои группы</Typography>
        <Button
          component={Link}
          to="/add-new-group"
          sx={{ fontWeight: "bold", fontSize: "14px", px: 1, height: "40px" }}
          variant="outlined"
        >
          Добавить группу +
        </Button>
      </Grid>
      <GroupCards groups={groups} courses={courses} />
    </Container>
  );
};

export default GroupManagement;
