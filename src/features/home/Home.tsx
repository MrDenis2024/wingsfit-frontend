import { Grid2, Typography } from "@mui/material";
import TrainerCard from "../trainer/components/TrainerCard.tsx";
import ScheduleCard from "../courses/components/ScheduleCard.tsx";
import Auth from "../auth/Auth";

const Home = () => {
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

  const trainers = [
    {
      _id: "1",
      firstName: "Inna",
      lastName: "Zumba",
      avatar: null,
      experience: "Certified Zumba instructor with 10 years of experience.",
    },
    {
      _id: "2",
      firstName: "Inna",
      lastName: "Zumba",
      avatar: null,
      experience: "Certified Zumba instructor with 10 years of experience.",
    },
    {
      _id: "3",
      firstName: "Inna",
      lastName: "Zumba",
      avatar: null,
      experience: "Certified Zumba instructor with 10 years of experience.",
    },
  ];

  return (
    <>
      <Auth />
      <Grid2 container direction="column" spacing={2}>
        <Grid2 alignItems="start">
          <Typography variant="h4" component="h1">
            Class Schedule
          </Typography>
        </Grid2>

        <Grid2 container spacing={2}>
          {Schedules.map((schedule) => {
            console.log(schedule);
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
          <Typography variant="h4" component="h1">
            Trainers
          </Typography>
        </Grid2>

        <Grid2 container spacing={2}>
          {trainers.map((trainer) => {
            console.log(trainer);
            return (
              <Grid2 key={trainer._id}>
                <TrainerCard
                  _id={trainer._id}
                  firstName={trainer.firstName}
                  lastName={trainer.lastName}
                  avatar={trainer.avatar}
                  experience={trainer.experience}
                />
              </Grid2>
            );
          })}
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
