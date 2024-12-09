import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import CourseCards from "../../courses/components/CourseCards.tsx";
import TrainersCards from "../../trainers/components/TrainersCards.tsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectTrainers } from "../../trainers/trainersSlice.ts";
import { selectCourses } from "../../courses/coursesSlice.ts";
import { getTrainers } from "../../trainers/trainersThunks.ts";
import { fetchCourses } from "../../courses/coursesThunks.ts";

const ClientMainPage = () => {
  const dispatch = useAppDispatch();
  const trainers = useAppSelector(selectTrainers);
  const courses = useAppSelector(selectCourses);

  useEffect(() => {
    try {
      dispatch(getTrainers());
      dispatch(fetchCourses());
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column" spacing={2} mb={5}>
        <Grid alignItems="start">
          <Typography variant="h4" component="h1">
            Courses
          </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center" direction="column">
          <CourseCards courses={courses} />
        </Grid>
      </Grid>

      <Grid container direction="column" spacing={2}>
        <Grid alignItems="start">
          <Typography variant="h4" component="h2">
            Trainers
          </Typography>
        </Grid>
        <TrainersCards trainers={trainers} />
      </Grid>
    </>
  );
};

export default ClientMainPage;
