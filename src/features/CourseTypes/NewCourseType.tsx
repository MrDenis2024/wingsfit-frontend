import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCreateCourseTypeLoading } from "./CourseTypesSlice.ts";
import { CourseTypeFields } from "../../types/courseTypes.ts";
import { createCourseType, fetchCourseTypes } from "./CourseTypesThunks.ts";
import { toast } from "react-toastify";
import CourseTypeForm from "./components/CourseTypeForm.tsx";
import { Container } from "@mui/material";
import { GlobalError } from "../../types/userTypes.ts";
import React from "react";

interface Props {
  onClose: () => void;
}

const NewCourseType: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateCourseTypeLoading);

  const onFormSubmit = async (courseType: CourseTypeFields) => {
    try {
      await dispatch(createCourseType(courseType)).unwrap();
      dispatch(fetchCourseTypes());
      toast.success("Новый тип курса отправлен на рассмотрение модерации");
      onClose();
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <CourseTypeForm
        onSubmit={onFormSubmit}
        isLoading={isCreating}
        onClose={onClose}
      />
    </Container>
  );
};

export default NewCourseType;
