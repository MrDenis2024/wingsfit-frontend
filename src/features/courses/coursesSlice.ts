import { ValidationError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  editCourse,
  fetchCourses, fetchSearchCourses,
  getOneCourse,
} from "./coursesThunks.ts";
import { ICourse } from "../../types/courseTypes.ts";

export interface CoursesState {
  courses: ICourse[];
  searchCourses: ICourse[];
  coursesLoading: boolean;
  searchCoursesLoading: boolean;
  isCreating: boolean;
  oneCourse: ICourse | null;
  oneCourseLoading: boolean;
  updateLoading: boolean;
  isCourseError: ValidationError | null;
}

const initialState: CoursesState = {
  courses: [],
  searchCourses: [],
  coursesLoading: false,
  searchCoursesLoading: false,
  isCreating: false,
  oneCourse: null,
  oneCourseLoading: false,
  updateLoading: false,
  isCourseError: null,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.isCreating = true;
        state.isCourseError = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createCourse.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.isCourseError = error || null;
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
      .addCase(fetchSearchCourses.pending, (state) => {
      state.searchCoursesLoading = true;
    })
      .addCase(fetchSearchCourses.fulfilled, (state, { payload: courses }) => {
      state.searchCourses = courses;
      state.searchCoursesLoading = false;
    })
      .addCase(fetchSearchCourses.rejected, (state) => {
        state.searchCoursesLoading = false;
      });

    builder
      .addCase(getOneCourse.pending, (state) => {
        state.oneCourseLoading = true;
        state.oneCourse = null;
      })
      .addCase(getOneCourse.fulfilled, (state, { payload: oneCourse }) => {
        state.oneCourse = oneCourse;
        state.oneCourseLoading = false;
      })
      .addCase(getOneCourse.rejected, (state) => {
        state.oneCourseLoading = false;
      });

    builder
      .addCase(editCourse.pending, (state) => {
        state.updateLoading = true;
        state.isCourseError = null;
      })
      .addCase(editCourse.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(editCourse.rejected, (state, { payload: error }) => {
        state.updateLoading = false;
        state.isCourseError = error || null;
      });
  },
  selectors: {
    selectCoursesFetching: (state) => state.coursesLoading,
    selectCourseCreate: (state) => state.isCreating,
    selectCourses: (state) => state.courses,
    selectSearchCourses: (state) => state.searchCourses,
    selectSearchCoursesFetching: (state) => state.searchCoursesLoading,
    selectOneCourse: (state) => state.oneCourse,
    selectOneCourseLoading: (state) => state.oneCourseLoading,
    selectCourseUpdateLoading: (state) => state.updateLoading,
    selectCourseError: (state) => state.isCourseError,
  },
});

export const coursesReducer = coursesSlice.reducer;

export const {
  selectCourses,
  selectCoursesFetching,
  selectCourseCreate,
  selectOneCourse,
  selectOneCourseLoading,
  selectCourseUpdateLoading,
  selectCourseError,
  selectSearchCourses,
  selectSearchCoursesFetching
} = coursesSlice.selectors;
