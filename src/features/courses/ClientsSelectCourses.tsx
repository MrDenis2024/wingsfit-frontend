import SelectCourseForm from "./components/SelectCourseForm.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourses, selectCoursesFetching } from "./coursesSlice.ts";
import { fetchCourses } from "./coursesThunks.ts";
import { useEffect, useState } from "react";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import CourseCard from "./components/CourseCard.tsx";
import { ICourse } from "../../types/courseTypes.ts";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";

const cardBoxSx = {
  width: {
    xs: "100%",
    sm: "50%",
    md: "50%",
    lg: "33%",
  },
};

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
    <Stack direction="column" spacing={3} sx={{ my: 2, mx: 4 }}>
      <Grid2>
        <SelectCourseForm onSubmit={submitHandler} isLoading={coursesLoading} />
      </Grid2>
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
          {!coursesLoading && filteredCourses.length > 0 && (
            <>
              <Grid2>
                <Typography variant="h5">Выбранные курсы:</Typography>
              </Grid2>
              <Grid2 container>
                {filteredCourses.map((course: ICourse) => (
                  <Grid2 key={course._id} sx={cardBoxSx}>
                    <CourseCard course={course} />
                  </Grid2>
                ))}
              </Grid2>
            </>
          )}
          {!coursesLoading && nonMatchingCourses.length > 0 && (
            <>
              <Grid2>
                <Typography variant="h5">Остальные курсы:</Typography>
              </Grid2>
              <Grid2 container>
                {nonMatchingCourses.map((course: ICourse) => (
                  <Grid2 key={course._id} sx={cardBoxSx}>
                    <CourseCard course={course} />
                  </Grid2>
                ))}
              </Grid2>
            </>
          )}
        </>
      )}
    </Stack>
  );
};

export default ClientsSelectCourses;
