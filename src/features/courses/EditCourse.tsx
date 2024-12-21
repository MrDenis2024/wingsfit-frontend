import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectCourseUpdateLoading,
  selectOneCourse,
  selectOneCourseLoading,
} from "./coursesSlice.ts";
import { useEffect } from "react";
import { editCourse, getOneCourse } from "./coursesThunks.ts";
import { CourseMutation } from "../../types/courseTypes.ts";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid2";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";
import { Container, Typography } from "@mui/material";
import CourseForm from "./components/CourseForm.tsx";
import { selectUser } from "../users/userSlice.ts";

const EditCourse = () => {
  const { id } = useParams() as { id: string };
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFetching = useAppSelector(selectOneCourseLoading);
  const course = useAppSelector(selectOneCourse);
  const isUpdating = useAppSelector(selectCourseUpdateLoading);

  useEffect(() => {
    dispatch(getOneCourse(id));
  }, [dispatch, id]);

  const onSubmit = async (course: CourseMutation) => {
    try {
      await dispatch(editCourse({ id, course })).unwrap();
      navigate("/");
      toast.success("Курс успешно обновлен");
    } catch {
      toast.error("Не удалось обновить курс");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid>
        {isFetching && <LoadingIndicator />}
        {course &&
          user &&
          (course.user._id === user._id ? (
            <CourseForm
              onSubmit={onSubmit}
              isLoading={isUpdating}
              existingCourse={course}
            />
          ) : (
            <Typography variant="h6" color="error">
              У вас нет прав на редактирование этого курса.
            </Typography>
          ))}
      </Grid>
    </Container>
  );
};

export default EditCourse;
