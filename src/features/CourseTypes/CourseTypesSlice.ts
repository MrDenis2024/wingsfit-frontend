import { createSlice } from "@reduxjs/toolkit";
import {
  blockCourseType,
  createCourseType,
  fetchCourseTypes,
  publicCourseType,
} from "./CourseTypesThunks.ts";
import { ICourseType } from "../../types/courseTypes.ts";
import { ValidationError } from "../../types/userTypes.ts";

interface CourseTypesState {
  items: ICourseType[];
  itemsFetching: boolean;
  createCourseTypeLoading: boolean;
  createCourseTypeError: ValidationError | null;
  blockCourseTypeLoading: false | string;
  publicCourseTypeLoading: false | string;
}

const initialState: CourseTypesState = {
  items: [],
  itemsFetching: false,
  createCourseTypeLoading: false,
  createCourseTypeError: null,
  blockCourseTypeLoading: false,
  publicCourseTypeLoading: false,
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

    builder
      .addCase(createCourseType.pending, (state) => {
        state.createCourseTypeError = null;
        state.createCourseTypeLoading = true;
      })
      .addCase(createCourseType.fulfilled, (state) => {
        state.createCourseTypeLoading = false;
      })
      .addCase(createCourseType.rejected, (state, { payload: error }) => {
        state.createCourseTypeError = error || null;
        state.createCourseTypeLoading = false;
      });

    builder
      .addCase(blockCourseType.pending, (state, { meta: { arg: type } }) => {
        state.blockCourseTypeLoading = type;
      })
      .addCase(blockCourseType.fulfilled, (state) => {
        state.blockCourseTypeLoading = false;
      })
      .addCase(blockCourseType.rejected, (state) => {
        state.blockCourseTypeLoading = false;
      });

    builder
      .addCase(publicCourseType.pending, (state, { meta: { arg: type } }) => {
        state.publicCourseTypeLoading = type;
      })
      .addCase(publicCourseType.fulfilled, (state) => {
        state.publicCourseTypeLoading = false;
      })
      .addCase(publicCourseType.rejected, (state) => {
        state.publicCourseTypeLoading = false;
      });
  },
  selectors: {
    selectCourseTypes: (state) => state.items,
    selectCourseTypesFetching: (state) => state.itemsFetching,
    selectCreateCourseTypeLoading: (state) => state.createCourseTypeLoading,
    selectCreateCourseTypeError: (state) => state.createCourseTypeError,
    selectBlockCourseTypeLoading: (state) => state.blockCourseTypeLoading,
    selectPublicCourseTypeLoading: (state) => state.publicCourseTypeLoading,
  },
});

export const courseTypesReducer = courseTypesSlice.reducer;
export const {
  selectCourseTypes,
  selectCourseTypesFetching,
  selectCreateCourseTypeLoading,
  selectCreateCourseTypeError,
  selectBlockCourseTypeLoading,
  selectPublicCourseTypeLoading,
} = courseTypesSlice.selectors;
