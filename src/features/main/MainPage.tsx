import { Grid2, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import {
  selectTrainerProfile,
  selectTrainerProfileLoading,
  selectTrainers,
} from "../trainers/trainersSlice.ts";
import { getTrainers } from "../trainers/trainersThunks.ts";
import TrainersCards from "../trainers/components/TrainersCards.tsx";
import {
  selectClientProfile,
  selectClientProfileLoading,
} from "../clients/clientSlice.ts";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../users/userSlice.ts";
import {selectCourses} from "../courses/coursesSlice.ts";
import {fetchCourses} from "../courses/coursesThunks.ts";
import CourseCards from "../courses/components/CourseCards.tsx";

const MainPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const trainers = useAppSelector(selectTrainers);
  const trainerProfile = useAppSelector(selectTrainerProfile);
  const clientProfile = useAppSelector(selectClientProfile);
  const clientProfileLoading = useAppSelector(selectClientProfileLoading);
  const trainerProfileLoading = useAppSelector(selectTrainerProfileLoading);
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && (!trainerProfileLoading || !clientProfileLoading)) {
      const role = user.role;

      if (
        (role === "trainer" &&
          (!trainerProfile ||
            !user.firstName ||
            !user.lastName ||
            !user.gender ||
            !user.timeZone ||
            trainerProfile.courseTypes.length < 1)) ||
        (role === "client" &&
          (!clientProfile ||
            !user.firstName ||
            !user.lastName ||
            !user.gender ||
            !user.timeZone))
      ) {
        navigate(`/fill-profile/${role}`);
      }
    }
  }, [
    user,
    trainerProfileLoading,
    clientProfileLoading,
    navigate,
    trainerProfile,
    clientProfile,
  ]);

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
      <Grid2 container direction="column" spacing={2} mb={5}>
        <Grid2 alignItems="start">
          <Typography variant="h4" component="h1">
            Courses
          </Typography>
        </Grid2>
        <Grid2 container spacing={2} justifyContent="center">
          <CourseCards courses={courses} />
        </Grid2>
      </Grid2>

      <Grid2 container direction="column" spacing={2}>
        <Grid2 alignItems="start">
          <Typography variant="h4" component="h2">
            Trainers
          </Typography>
        </Grid2>
        <TrainersCards trainers={trainers} />
      </Grid2>
    </>
  );
};

export default MainPage;
