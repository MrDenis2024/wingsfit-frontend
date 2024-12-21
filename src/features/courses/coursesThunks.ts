import { createAsyncThunk } from "@reduxjs/toolkit";
import { ValidationError } from "../../types/userTypes.ts";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import {
  CourseMutation,
  ICourse,
  UpdateCourseArg,
} from "../../types/courseTypes.ts";

export const fetchCourses = createAsyncThunk<ICourse[], string | undefined>(
  "courses/fetchAll",
  async (trainerId = "") => {
    const { data: courses } = await axiosApi.get<ICourse[]>(
      `/courses?trainerId=${trainerId}`,
    );

    if (!courses) {
      return [];
    }

    return courses;
  },
);

export const createCourse = createAsyncThunk<
  void,
  CourseMutation,
  { rejectValue: ValidationError; state: RootState }
>("courses/create", async (courseMutation, { rejectWithValue }) => {
  const formData = new FormData();
  if (courseMutation.image) {
    formData.append("image", courseMutation.image);
  }
  formData.append("title", courseMutation.title);
  formData.append("description", courseMutation.description);
  formData.append("courseType", courseMutation.courseType);
  formData.append("format", courseMutation.format);
  courseMutation.schedule.forEach((day) => {
    formData.append("schedule[]", day);
  });
  formData.append("price", courseMutation.price);

  try {
    await axiosApi.post("/courses", formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getOneCourse = createAsyncThunk<ICourse, string>(
  "courses/getOneCourse",
  async (id) => {
    const { data: course } = await axiosApi.get<ICourse>(`/courses/${id}`);
    return course;
  },
);

export const editCourse = createAsyncThunk<
  void,
  UpdateCourseArg,
  { rejectValue: ValidationError }
>("courses/editCourse", async ({ id, course }, { rejectWithValue }) => {
  try {
    await axiosApi.put(`/courses/${id}`, course);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
