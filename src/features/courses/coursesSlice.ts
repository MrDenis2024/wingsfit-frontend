import {GlobalError} from "../../types/userTypes.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createCourse, getOneCourse} from "./coursesThunks.ts";
import {ICourse} from "../../types/courseTypes.ts";

export interface CoursesState {
  isCreating: boolean;
  isCreatingError: GlobalError | null;
  oneCourse: ICourse | null;
  oneCourseLoading: boolean;
  courseError: GlobalError | null;
}

const initialState: CoursesState = {
  isCreating: false,
  isCreatingError: null,
  oneCourse: null,
  oneCourseLoading: false,
  courseError: null,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.isCreating = true;
        state.isCreatingError = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createCourse.rejected, (state, {payload: error}) => {
        state.isCreating = false;
        state.isCreatingError = error || null;
      });
    builder
      .addCase(getOneCourse.pending, (state) => {
        state.oneCourseLoading = true;
        state.courseError = null;
      })
      .addCase(getOneCourse.fulfilled, (state, {payload: oneCourse}) => {
        state.oneCourseLoading = false;
        state.oneCourse = oneCourse;
      })
      .addCase(getOneCourse.rejected, (state, {payload: error}) => {
        state.oneCourseLoading = false;
        state.courseError = error || null;
      });
  },
  selectors: {
    selectCourseCreate: (state) => state.isCreating,
    selectCourseCreateError: (state) => state.isCreatingError,
    selectOneCourse: (state) => state.oneCourse,
    selectOneCourseLoading: (state) => state.oneCourseLoading,
    selectCourseError: (state) => state.courseError,
  },
});

export const coursesReducer = coursesSlice.reducer;

export const {
  selectCourseCreate,
  selectCourseCreateError,
  selectOneCourse,
  selectOneCourseLoading,
  selectCourseError
} =
  coursesSlice.selectors;
