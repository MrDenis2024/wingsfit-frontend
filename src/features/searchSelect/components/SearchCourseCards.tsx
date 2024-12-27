import {ICourse} from "../../../types/courseTypes.ts";
import React from "react";
import Grid from "@mui/material/Grid2";
import CourseCard from "../../courses/components/CourseCard.tsx";
import {Alert} from "@mui/material";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";

interface Props {
  courses: ICourse[];
  isLoading: boolean;
}

const SearchCourseCards: React.FC<Props> = ({ courses, isLoading }) => {

  return (
    <Grid container spacing={3} sx={{ mb: 5 }} display="flex">
      {!isLoading ? (
        courses.length > 0 ? (
          courses.map((course) => (
            <Grid
              key={course._id}
              size={{ md: 4, lg: 4, sm: 6, xs: 12 }}
              display="flex"
              justifyContent="center"
            >
              <CourseCard course={course} isShort={true} />
            </Grid>
          ))
        ) : (
          <Alert severity="info" sx={{ width: "100%" }}>
            Здесь пока нет ничего нет, выберите фильтры!
          </Alert>
        )
      ) : (
        <Grid display="flex" justifyContent="center" size={12}>
          <LoadingIndicator />
        </Grid>
      )}
    </Grid>
  );
};

export default SearchCourseCards;