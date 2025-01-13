import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../types/lessonTypes";
import {createLesson, fetchGroupLessons, fetchTrainerLessons, patchLesson} from "./lessonsThunk.ts";

interface LessonState {
  trainerLessons: Lesson[];
  groupLessons: Lesson[];
  trainerLessonsLoading: boolean;
  groupLessonsLoading: boolean;
  lessonCreating: boolean;
  lessonUpdating: boolean;
}

const initialState: LessonState = {
  trainerLessons: [],
  groupLessons: [],
  trainerLessonsLoading: false,
  groupLessonsLoading: false,
  lessonCreating: false,
  lessonUpdating: false,
};

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainerLessons.pending, (state) => {
        state.trainerLessonsLoading = true;
      })
      .addCase(fetchTrainerLessons.fulfilled, (state, { payload: lessons }) => {
        state.trainerLessonsLoading = false;
        state.trainerLessons = lessons;
      })
      .addCase(fetchTrainerLessons.rejected, (state) => {
        state.trainerLessonsLoading = false;
      });

    builder
      .addCase(fetchGroupLessons.pending, (state) => {
        state.groupLessonsLoading = true;
      })
      .addCase(fetchGroupLessons.fulfilled, (state, { payload: lessons }) => {
        state.groupLessonsLoading = false;
        state.groupLessons = lessons;
      })
      .addCase(fetchGroupLessons.rejected, (state) => {
        state.groupLessonsLoading = false;
      });

    builder
      .addCase(createLesson.pending, (state) => {
        state.lessonCreating = true;
      })
      .addCase(createLesson.fulfilled, (state) => {
        state.lessonCreating = false;
      })
      .addCase(createLesson.rejected, (state) => {
        state.lessonCreating = false;
      });

    builder
      .addCase(patchLesson.pending, (state) => {
        state.lessonUpdating = true;
      })
      .addCase(patchLesson.fulfilled, (state) => {
        state.lessonUpdating = false;
      })
      .addCase(patchLesson.rejected, (state) => {
        state.lessonUpdating = false;
      });
  },
  selectors: {
    selectTrainerLessons: (state) => state.trainerLessons,
    selectTrainerLessonsLoading: (state) => state.trainerLessonsLoading,
    selectGroupLessons: (state) => state.groupLessons,
    selectGroupLessonsLoading: (state) => state.groupLessonsLoading,
    selectLessonCreating: (state) => state.lessonCreating,
    selectLessonUpdating: (state) => state.lessonUpdating,
  },
});

export const lessonsReducer = lessonsSlice.reducer;

export const {
  selectTrainerLessons,
  selectTrainerLessonsLoading,
  selectGroupLessons,
  selectGroupLessonsLoading,
  selectLessonCreating,
  selectLessonUpdating,
} = lessonsSlice.selectors;
