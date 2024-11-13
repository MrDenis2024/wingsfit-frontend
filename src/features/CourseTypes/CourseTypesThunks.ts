import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { CourseTypeFields } from "../../types/courseTypes.ts";

export const fetchCourseTypes = createAsyncThunk(
  "courseTypes/fetchAll",
  async () => {
    const { data: courseTypeFields } =
      await axiosApi.get<CourseTypeFields[]>("/courseTypes");
    return courseTypeFields;
  },
);
