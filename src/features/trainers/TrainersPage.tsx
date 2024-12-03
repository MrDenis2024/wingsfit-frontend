import { useEffect } from "react";
import { fetchCourses } from "../courses/coursesThunks.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourses } from "../courses/coursesSlice.ts";
import UpdTrainerCard from "./components/UpdTrainerCard.tsx";
import { Box, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import BeRoleButton from "../welcomePage/components/buttons/BeRoleButton.tsx";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "10px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        {courses.map((course) => (
          <UpdTrainerCard key={course._id} courses={course} />
        ))}
        {courses.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Курсы отсутствуют.
          </Typography>
        )}
      </Box>
      <Box>
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
      </Box>
    </Box>
  );
};

export default TrainersPage;
