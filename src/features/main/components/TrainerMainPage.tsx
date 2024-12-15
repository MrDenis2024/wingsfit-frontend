import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";
import { selectCourses } from "../../courses/coursesSlice.ts";
import { selectGroups } from "../../groups/groupsSlice.ts";
import { useEffect } from "react";
import { fetchCourses } from "../../courses/coursesThunks.ts";
import { fetchAllGroups } from "../../groups/groupsThunk.ts";
import { Button, Typography } from "@mui/material";
import CourseCards from "../../courses/components/CourseCards.tsx";
import GroupCards from "../../groups/components/GroupCards.tsx";
import { Link } from "react-router-dom";

const TrainerMainPage = () => {
  const user = useAppSelector(selectUser);
  const courses = useAppSelector(selectCourses);
  const groups = useAppSelector(selectGroups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCourses(user?._id));
    void dispatch(fetchAllGroups());
  }, [dispatch, user?._id]);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Мои курсы</Typography>
        <Button
          component={Link}
          to="/add-new-course"
          sx={{ fontWeight: "bold", fontSize: "14px", px: 1, height: "40px" }}
          variant="outlined"
        >
          Добавить курс +
        </Button>
      </Grid>
      <CourseCards courses={courses} />
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
      <GroupCards groups={groups} />
    </>
  );
};

export default TrainerMainPage;
