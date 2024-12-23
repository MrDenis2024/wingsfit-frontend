import SelectCourseForm from "./components/SelectCourseForm.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourses, selectCoursesFetching } from "./coursesSlice.ts";
import { fetchCourses } from "./coursesThunks.ts";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ICourse } from "../../types/courseTypes.ts";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";
import CourseCards from "./components/CourseCards.tsx";

const ClientsSelectCourses = () => {
  const dispatch = useAppDispatch();
  const allCourses = useAppSelector(selectCourses);
  const coursesLoading = useAppSelector(selectCoursesFetching);

  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [nonMatchingCourses, setNonMatchingCourses] = useState<ICourse[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const submitHandler = (selectedSchedules: string[], type: string) => {
    const matchingCourses = allCourses.reduce((acc: ICourse[], rec) => {
      const check = rec.schedule.map((day) => {
        return selectedSchedules.includes(day);
      });
      if (check.includes(true) && rec.courseType.name === type) {
        return [...acc, rec];
      } else return acc;
    }, []);
    const nonMatchingCourses = allCourses.reduce((acc: ICourse[], rec) => {
      const check = rec.schedule.map((day) => {
        return selectedSchedules.includes(day);
      });
      if (!check.includes(true) || rec.courseType.name !== type) {
        return [...acc, rec];
      } else return acc;
    }, []);

    setFilteredCourses(matchingCourses);
    setNonMatchingCourses(nonMatchingCourses);
    setSubmitted(true);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid container>
        <SelectCourseForm onSubmit={submitHandler} isLoading={coursesLoading} />
      </Grid>
      {submitted && (
        <>
          {coursesLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <LoadingIndicator />
            </Box>
          )}
          <Grid container spacing={2}>
            {!coursesLoading && filteredCourses.length > 0 && (
              <>
                <Grid size={12}>
                  <Typography variant="h5">Выбранные курсы:</Typography>
                </Grid>
                <Grid size={12}>
                  <CourseCards courses={filteredCourses} isShort={true} />
                </Grid>
              </>
            )}
            {!coursesLoading && nonMatchingCourses.length > 0 && (
              <>
                <Grid size={12}>
                  <Typography variant="h5">Остальные курсы:</Typography>
                </Grid>
                <Grid size={12}>
                  <CourseCards courses={nonMatchingCourses} isShort={true} />
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ClientsSelectCourses;
