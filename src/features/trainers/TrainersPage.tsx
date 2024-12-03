import { useEffect } from "react";
import { fetchCourses } from "../courses/coursesThunks.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourses } from "../courses/coursesSlice.ts";
import AdvertisementCard from "./components/AdvertisementCard.tsx";
import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import BeRoleButton from "../welcomePage/components/buttons/BeRoleButton.tsx";
import Grid from "@mui/material/Grid2";

const TrainersPage = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);

  useEffect(() => {
    try {
      dispatch(fetchCourses());
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  return (
    <Grid
      container
      spacing={2}
      direction={"column"}
      sx={{
        my: 3,
      }}
    >
      <Typography component="h1" variant="h4">
        Trainers
      </Typography>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid
            size={{ md: 4, xs: 12, sm: 6 }}
            key={course._id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AdvertisementCard courses={course} />
          </Grid>
        ))}
        {courses.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Курсы отсутствуют.
          </Typography>
        )}
      </Grid>
      <Grid>
        <Stack
          direction="row"
          gap={2}
          flexWrap="wrap"
          mt={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "auto",
          }}
        >
          <NavLink to="/login/trainer" style={{ textDecoration: "none" }}>
            <BeRoleButton text="Быть тренером!" />
          </NavLink>
          <NavLink to="/login/client" style={{ textDecoration: "none" }}>
            <BeRoleButton text="Хочу тренироваться!" />
          </NavLink>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TrainersPage;
