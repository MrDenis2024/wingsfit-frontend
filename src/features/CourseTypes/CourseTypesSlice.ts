import { createSlice } from "@reduxjs/toolkit";
import { fetchCourseTypes } from "./CourseTypesThunks.ts";
import { CourseTypeFields } from "../../types/courseTypes.ts";

interface CourseTypesState {
  items: CourseTypeFields[];
  itemsFetching: boolean;
}

const initialState: CourseTypesState = {
  items: [],
  itemsFetching: false,
};

export const courseTypesSlice = createSlice({
  name: "courseTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseTypes.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(
        fetchCourseTypes.fulfilled,
        (state, { payload: courseTypes }) => {
          state.itemsFetching = false;
          state.items = courseTypes;
        },
      )
      .addCase(fetchCourseTypes.rejected, (state) => {
        state.itemsFetching = false;
      });
  },
  selectors: {
    selectCourseTypes: (state) => state.items,
    selectCourseTypesFetching: (state) => state.itemsFetching,
  },
});

export const courseTypesReducer = courseTypesSlice.reducer;
export const { selectCourseTypes, selectCourseTypesFetching } =
  courseTypesSlice.selectors;
