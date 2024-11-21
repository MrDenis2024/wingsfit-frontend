import { GlobalError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import { createCourse, getOneCourse, fetchCourses } from "./coursesThunks.ts";
import { ICourse } from "../../types/courseTypes.ts";

export interface CoursesState {
  courses: ICourse[];
  coursesLoading: boolean;
  isCreating: boolean;
  isCreatingError: GlobalError | null;
  oneCourse: ICourse | null;
  oneCourseLoading: boolean;
}

const initialState: CoursesState = {
  courses: [],
  coursesLoading: false,
  isCreating: false,
  isCreatingError: null,
  oneCourse: null,
  oneCourseLoading: false,
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
      .addCase(createCourse.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.isCreatingError = error || null;
      });

    builder
      .addCase(fetchCourses.pending, (state) => {
        state.coursesLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, { payload: courses }) => {
        state.courses = courses;
        state.coursesLoading = false;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.coursesLoading = false;
      });

    builder
      .addCase(getOneCourse.pending, (state) => {
        state.oneCourseLoading = true;
      })
      .addCase(getOneCourse.fulfilled, (state, { payload: oneCourse }) => {
        state.oneCourse = oneCourse;
        state.oneCourseLoading = false;
      })
      .addCase(getOneCourse.rejected, (state) => {
        state.oneCourseLoading = false;
      });
  },
  selectors: {
    selectCoursesFetching: (state) => state.coursesLoading,
    selectCourseCreate: (state) => state.isCreating,
    selectCourseCreateError: (state) => state.isCreatingError,
    selectCourses: (state) => state.courses,
    selectOneCourse: (state) => state.oneCourse,
    selectOneCourseLoading: (state) => state.oneCourseLoading,
  },
});

export const coursesReducer = coursesSlice.reducer;

export const {
  selectCourses,
  selectCoursesFetching,
  selectCourseCreate,
  selectCourseCreateError,
  selectOneCourse,
  selectOneCourseLoading,
} = coursesSlice.selectors;
