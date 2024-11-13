import { Grid2, Typography } from "@mui/material";
import ScheduleCard from "../schedules/components/ScheduleCard.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  selectTrainerProfile,
  selectTrainers,
} from "../trainers/trainersSlice.ts";
import { selectClientProfile } from "../clients/clientSlice.ts";
import { getTrainerProfile, getTrainers } from "../trainers/trainersThunks.ts";
import { getClientProfile } from "../clients/clientThunk.ts";
import TrainersCards from "../trainers/components/TrainersCards.tsx";

const Main = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const trainerProfile = useAppSelector(selectTrainerProfile);
  const clientProfile = useAppSelector(selectClientProfile);
  const trainers = useAppSelector(selectTrainers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (user && user.role === "trainer") {
        void dispatch(getTrainerProfile()).unwrap();
      } else if (user && user.role === "client") {
        void dispatch(getClientProfile()).unwrap();
      }
    } catch (e) {
      console.error(e);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && user.role === "trainer") {
      const trainer = user;
      const role = user.role;

      if (
        !trainerProfile ||
        !trainer.firstName ||
        !trainer.lastName ||
        !trainer.gender ||
        !trainer.timeZone ||
        trainerProfile.courseTypes.length < 1
      ) {
        navigate(`/fill-profile/${role}`);
      }
    } else if (user && user.role === "client") {
      const client = user;
      const role = user.role;

      if (
        !clientProfile ||
        !client.firstName ||
        !client.lastName ||
        !client.gender ||
        !client.timeZone
      ) {
        navigate(`/fill-profile/${role}`);
      }
    }
  }, [user, navigate, trainerProfile, clientProfile]);

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

export default Main;
