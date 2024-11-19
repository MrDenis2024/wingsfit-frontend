import {ICourse} from "../../../types/courseTypes.ts";
import React from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectCoursesLoading} from "../coursesSlice.ts";
import {Grid2} from "@mui/material";
import CourseCard from "./CourseCard.tsx";

interface Props {
  courses: ICourse[];
}

const CourseCards: React.FC<Props> = ({ courses }) => {
  const isLoading = useAppSelector(selectCoursesLoading);

  return (
    <Grid2 container spacing={2}>
      {!isLoading && (
        courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))
      ) }
    </Grid2>
  );
};

export default CourseCards;