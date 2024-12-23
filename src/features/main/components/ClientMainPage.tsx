import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, useMediaQuery } from "@mui/material";
import CourseCards from "../../courses/components/CourseCards.tsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectTrainers } from "../../trainers/trainersSlice.ts";
import { selectCourses } from "../../courses/coursesSlice.ts";
import { getTrainers } from "../../trainers/trainersThunks.ts";
import { fetchCourses } from "../../courses/coursesThunks.ts";
import { selectUser } from "../../users/userSlice.ts";
import TrainersMatchingCards from "../../trainers/components/TrainersMatchingCards.tsx";

const ClientMainPage = () => {
  const user = useAppSelector(selectUser);
  const trainers = useAppSelector(selectTrainers);
  const courses = useAppSelector(selectCourses);
  const isSmall = useMediaQuery("(max-width: 840px)");
  const isMedium = useMediaQuery("(max-width: 1200px)");
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (!user) {
        return;
      }

      dispatch(getTrainers(user._id));
      dispatch(fetchCourses());
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, user]);

  return (
    <>
      <Grid container direction="column" spacing={2} mb={3}>
        <Typography variant="h4" component="h1" mb={3}>
          Курсы
        </Typography>
        <CourseCards courses={courses} />
      </Grid>
      <Grid container direction="column" sx={{ my: 3 }}>
        <Typography variant="h4" component="h2" mb={3}>
          Наши тренера
        </Typography>
        <TrainersMatchingCards
          trainers={trainers}
          itemsPerSlide={isSmall ? 1 : isMedium ? 2 : 3}
        />
      </Grid>
    </>
  );
};

export default ClientMainPage;
