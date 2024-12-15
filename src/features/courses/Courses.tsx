import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourses } from "./coursesSlice.ts";
import { useEffect } from "react";
import { fetchCourses } from "./coursesThunks.ts";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
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
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid container direction="column">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          my={3}
        >
          <Typography variant="h4">Курсы</Typography>
          {user && user.role === "trainer" && (
            <Button
              component={Link}
              to="/add-new-course"
              sx={{ fontWeight: "bold", fontSize: "14px" }}
              variant="outlined"
            >
              Добавить +
            </Button>
          )}
        </Grid>
        <CourseCards courses={courses} />
      </Grid>
    </Container>
  );
};

export default Courses;
