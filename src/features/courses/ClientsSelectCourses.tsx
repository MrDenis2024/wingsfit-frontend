import SelectCourseForm from "./components/SelectCourseForm.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourses, selectCoursesFetching } from "./coursesSlice.ts";
import { fetchCourses } from "./coursesThunks.ts";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import CourseCard from "./components/CourseCard.tsx";
import { ICourse } from "../../types/courseTypes.ts";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";

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

  const submitHandler = (selectedSchedules: string[]) => {
    const matchingCourses = allCourses.filter((course) =>
      selectedSchedules.includes(course.schedule),
    );
    const nonMatchingCourses = allCourses.filter(
      (course) => !selectedSchedules.includes(course.schedule),
    );
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
                  {filteredCourses.map((course: ICourse) => (
                    <Grid
                      key={course._id}
                      size={{ md: 4, lg: 3, sm: 6, xs: 12 }}
                    >
                      <CourseCard course={course} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            {!coursesLoading && nonMatchingCourses.length > 0 && (
              <>
                <Grid size={12}>
                  <Typography variant="h5">Остальные курсы:</Typography>
                </Grid>
                <Grid size={12}>
                  {nonMatchingCourses.map((course: ICourse) => (
                    <Grid
                      key={course._id}
                      size={{ md: 4, lg: 3, sm: 6, xs: 12 }}
                    >
                      <CourseCard course={course} />
                    </Grid>
                  ))}
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
