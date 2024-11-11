import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "../../types/userTypes.ts";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { CourseMutation } from "../../types/courseTypes.ts";

export const createCourse = createAsyncThunk<
  void,
  CourseMutation,
  { rejectValue: GlobalError; state: RootState }
>("course/create", async (courseMutation, { rejectWithValue }) => {
  try {
    const { data: course } = await axiosApi.post("/course", courseMutation);
    return course;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
