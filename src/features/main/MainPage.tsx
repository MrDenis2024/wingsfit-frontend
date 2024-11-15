import { Grid2, Typography } from "@mui/material";
import ScheduleCard from "../schedules/components/ScheduleCard.tsx";
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

const MainPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const trainers = useAppSelector(selectTrainers);
  const trainerProfile = useAppSelector(selectTrainerProfile);
  const clientProfile = useAppSelector(selectClientProfile);
  const clientProfileLoading = useAppSelector(selectClientProfileLoading);
  const trainerProfileLoading = useAppSelector(selectTrainerProfileLoading);
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
      void dispatch(getTrainers()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  const Schedules = [
    {
      _id: "1",
      firstName: "Inna",
      lastName: "Zumba",
      avatar: null,
      courseType: "Fitness",
      workTime: "Monday, 10:00 Am",
    },
    {
      _id: "2",
      firstName: "Inna",
      lastName: "Zumba",
      avatar: null,
      courseType: "Fitness",
      workTime: "Monday, 10:00 Am",
    },
  ];

  return (
    <>
      <Grid2 container direction="column" spacing={2} mb={5}>
        <Grid2 alignItems="start">
          <Typography variant="h4" component="h1">
            Class Schedule
          </Typography>
        </Grid2>

        <Grid2 container spacing={2}>
          {Schedules.map((schedule) => {
            return (
              <Grid2 key={schedule._id}>
                <ScheduleCard
                  _id={schedule._id}
                  firstName={schedule.firstName}
                  lastName={schedule.lastName}
                  avatar={schedule.avatar}
                  courseType={schedule.courseType}
                  workTime={schedule.workTime}
                />
              </Grid2>
            );
          })}
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
