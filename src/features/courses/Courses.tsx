import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCourses} from "./coursesSlice.ts";
import {useEffect} from "react";
import {fetchCourses} from "./coursesThunks.ts";
import {useParams} from "react-router-dom";
import {Grid2, Typography} from "@mui/material";
import CourseCards from "./components/CourseCards.tsx";

const Courses = () => {
  const {trainerId} = useParams() as { trainerId: string };
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(fetchCourses(trainerId));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, trainerId]);

  return (
    <Grid2>
      <Typography variant="h2" >Courses</Typography>
      {courses.length > 0 && (
        <CourseCards courses={courses} />
      )}
    </Grid2>
  );
};

export default Courses;