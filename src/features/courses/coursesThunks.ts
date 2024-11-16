import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "../../types/userTypes.ts";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import {CourseMutation, ICourse} from "../../types/courseTypes.ts";

export const createCourse = createAsyncThunk<
  void,
  CourseMutation,
  { rejectValue: GlobalError; state: RootState }
>("courses/create", async (courseMutation, { rejectWithValue }) => {
  const formData = new FormData();
  const keys = Object.keys(courseMutation) as (keyof CourseMutation)[];
  keys.forEach((key) => {
    const value = courseMutation[key];
    if (value !== null) {
      formData.append(key, value);
    }
  });

  try {
    await axiosApi.post("/courses", formData);
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getOneCourse = createAsyncThunk<ICourse, string, { rejectValue: GlobalError }>(
  "courses/getOneCourse",
  async (id, { rejectWithValue }) => {
    try {
      const {data: course} = await axiosApi.get<ICourse>(`/courses/${id}`);
      return course;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);
