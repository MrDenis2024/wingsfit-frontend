import { ICourse } from "../../../types/courseTypes.ts";
import React from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { Alert } from "@mui/material";
import CourseCard from "./CourseCard.tsx";
import { selectCoursesFetching } from "../coursesSlice.ts";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";

interface Props {
  courses: ICourse[];
  isShort?: boolean;
}

const CourseCards: React.FC<Props> = ({ courses, isShort }) => {
  const isLoading = useAppSelector(selectCoursesFetching);
  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {!isLoading ? (
        courses.length > 0 ? (
          courses.map((course) => (
            <Grid size={{ md: 4, lg: 3, sm: 6, xs: 12 }} key={course._id}>
              <CourseCard course={course} isShort={isShort} />
            </Grid>
          ))
        ) : (
          <Alert severity="info" sx={{ width: "100%" }}>
            Здесь пока нет никаких курсов!
          </Alert>
        )
      ) : (
        <LoadingIndicator />
      )}
    </Grid>
  );
};

export default CourseCards;
