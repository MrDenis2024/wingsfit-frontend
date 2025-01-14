import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";
import { selectCourses } from "../../courses/coursesSlice.ts";
import { useEffect } from "react";
import { fetchCourses } from "../../courses/coursesThunks.ts";
import { Button, Typography } from "@mui/material";
import CourseCards from "../../courses/components/CourseCards.tsx";
import { Link } from "react-router-dom";

const TrainerMainPage = () => {
  const user = useAppSelector(selectUser);
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCourses(user?._id));
  }, [dispatch, user?._id]);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 3,
        }}
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
    </>
  );
};

export default TrainerMainPage;
