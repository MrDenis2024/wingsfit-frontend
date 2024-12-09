import { ICourse } from "../../../types/courseTypes.ts";
import React from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { Alert, Grid2 } from "@mui/material";
import CourseCard from "./CourseCard.tsx";
import { selectCoursesFetching } from "../coursesSlice.ts";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";

const cardBoxSx = {
  width: {
    xs: "100%",
    sm: "50%",
    md: "50%",
    lg: "33%",
  },
};

interface Props {
  courses: ICourse[];
}

const CourseCards: React.FC<Props> = ({ courses }) => {
  const isLoading = useAppSelector(selectCoursesFetching);
  return (
    <Grid2 container justifyContent="space-around" alignItems="center">
      {!isLoading ? (
        courses.length > 0 ? (
          courses.map((course) => (
            <Grid2 key={course._id} sx={cardBoxSx}>
              <CourseCard course={course} />
            </Grid2>
          ))
        ) : (
          <Alert severity="info" sx={{ width: "100%" }}>
            Здесь пока нет никаких курсов!
          </Alert>
        )
      ) : (
        <LoadingIndicator />
      )}
    </Grid2>
  );
};

export default CourseCards;
