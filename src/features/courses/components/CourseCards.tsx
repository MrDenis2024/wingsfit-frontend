import { ICourse } from "../../../types/courseTypes.ts";
import React from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { CircularProgress, Grid2 } from "@mui/material";
import CourseCard from "./CourseCard.tsx";
import { selectCoursesFetching } from "../coursesSlice.ts";

interface Props {
  courses: ICourse[];
}

const CourseCards: React.FC<Props> = ({ courses }) => {
  const isLoading = useAppSelector(selectCoursesFetching);
  return (
    <Grid2
      container
      spacing={3}
      justifyContent="space-around"
      alignItems="center"
    >
      {!isLoading ? (
        courses.map((course) => <CourseCard key={course._id} course={course} />)
      ) : (
        <CircularProgress />
      )}
    </Grid2>
  );
};

export default CourseCards;
