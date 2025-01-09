import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { CourseTypeFields, ICourseType } from "../../types/courseTypes.ts";
import { isAxiosError } from "axios";
import { GlobalError, ValidationError } from "../../types/userTypes.ts";

export const fetchCourseTypes = createAsyncThunk<ICourseType[], void>(
  "courseTypes/fetchAll",
  async () => {
    const { data: courses } = await axiosApi.get<ICourseType[]>("/courseTypes");
    return courses;
  },
);

export const createCourseType = createAsyncThunk<
  void,
  CourseTypeFields,
  { rejectValue: ValidationError }
>("courseTypes/create", async (courseTypeFields, { rejectWithValue }) => {
  try {
    await axiosApi.post("/courseTypes", courseTypeFields);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const publicCourseType = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>("courseTypes/public", async (courseTypeId, { rejectWithValue }) => {
  try {
    await axiosApi.patch(`/courseTypes/publish/${courseTypeId}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const blockCourseType = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>("courseTypes/block", async (courseTypeId, { rejectWithValue }) => {
  try {
    await axiosApi.patch(`/courseTypes/block/${courseTypeId}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
