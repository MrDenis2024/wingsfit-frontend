import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourseCreate } from "./coursesSlice.ts";
import { CourseMutation } from "../../types/courseTypes.ts";
import { createCourse } from "./coursesThunks.ts";
import { Typography } from "@mui/material";
import CourseForm from "./components/CourseForm.tsx";
import {selectUser} from "../users/userSlice.ts";

const NewCourse = () => {
  const trainer = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectCourseCreate);
  const dispatch = useAppDispatch();

  const onFormSubmit = async (courseMutation: CourseMutation) => {
    try {
      await dispatch(createCourse(courseMutation)).unwrap();
      navigate(`/trainers/courses/${trainer?._id}`);
    } catch (error) {
      console.error("Course creation error", error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New Course
      </Typography>
      <CourseForm onSubmit={onFormSubmit} isLoading={isCreating} />
    </>
  );
};

export default NewCourse;
