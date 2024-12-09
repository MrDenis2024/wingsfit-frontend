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
    <Grid container spacing={2} direction="column">
      <Grid>
        <Typography variant="h3">My courses</Typography>
        <Grid container justifyContent="flex-end" my={1}>
          <Button
            component={Link}
            to="/add-new-course"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
            variant="outlined"
          >
            Add course +
          </Button>
        </Grid>
        <CourseCards courses={courses} />
      </Grid>
      <Grid>
        <Typography variant="h3">My Groups</Typography>
        <Grid container justifyContent="flex-end" my={1}>
          <Button
            component={Link}
            to="/add-new-group"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
            variant="outlined"
          >
            Add group +
          </Button>
        </Grid>
        <GroupCards groups={groups} />
      </Grid>
    </Grid>
  );
};

export default TrainerMainPage;
