import { GlobalError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import { createCourse } from "./coursesThunks.ts";

export interface CoursesState {
  isCreating: boolean;
  isCreatingError: GlobalError | null;
}

const initialState: CoursesState = {
  isCreating: false,
  isCreatingError: null,
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
  },
  selectors: {
    selectCourseCreate: (state) => state.isCreating,
    selectCourseCreateError: (state) => state.isCreatingError,
  },
});

export const coursesReducer = coursesSlice.reducer;

export const { selectCourseCreate, selectCourseCreateError } =
  coursesSlice.selectors;
