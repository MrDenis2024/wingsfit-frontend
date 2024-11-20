import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourses } from "./coursesSlice.ts";
import { useEffect } from "react";
import { fetchCourses } from "./coursesThunks.ts";
import { Link, useParams } from "react-router-dom";
import { Button, Grid2, Typography } from "@mui/material";
import CourseCards from "./components/CourseCards.tsx";
import Grid from "@mui/material/Grid2";
import { selectUser } from "../users/userSlice.ts";

const Courses = () => {
  const user = useAppSelector(selectUser);
  const { trainerId } = useParams() as { trainerId: string };
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(fetchCourses(trainerId));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, trainerId]);

  return (
    <Grid2>
      {user && user.role === "trainer" && (
        <Grid container justifyContent="flex-end" mt={1}>
          <Button
            component={Link}
            to="/add-new-course"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
            variant="outlined"
          >
            Add course +
          </Button>
        </Grid>
      )}
      <Typography variant="h3" mb={3}>
        Courses
      </Typography>
      {courses.length > 0 && <CourseCards courses={courses} />}
    </Grid2>
  );
};

export default Courses;
