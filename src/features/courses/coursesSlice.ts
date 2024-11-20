import { GlobalError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import { createCourse, fetchCourses } from "./coursesThunks.ts";
import { Course } from "../../types/courseTypes.ts";

export interface CoursesState {
  items: Course[];
  itemsFetching: boolean;
  isCreating: boolean;
  isCreatingError: GlobalError | null;
}

const initialState: CoursesState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
  isCreatingError: null,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchCourses.fulfilled, (state, { payload: courses }) => {
        state.itemsFetching = false;
        state.items = courses;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.itemsFetching = false;
      });
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
  },
  selectors: {
    selectCourses: (state) => state.items,
    selectCoursesFetching: (state) => state.itemsFetching,
    selectCourseCreate: (state) => state.isCreating,
    selectCourseCreateError: (state) => state.isCreatingError,
  },
});

export const coursesReducer = coursesSlice.reducer;

export const {
  selectCourses,
  selectCoursesFetching,
  selectCourseCreate,
  selectCourseCreateError,
} = coursesSlice.selectors;
