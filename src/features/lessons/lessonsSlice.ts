import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../types/lessonTypes";
import {
  createLesson,
  fetchGroupLessons,
  fetchLastLesson,
  fetchTrainerLessons,
  patchLesson,
} from "./lessonsThunk.ts";

interface LessonState {
  trainerLessons: Lesson[];
  groupLessons: Lesson[];
  trainerLessonsLoading: boolean;
  groupLessonsLoading: boolean;
  lessonCreating: string | false;
  lessonUpdating: boolean;
  lastLesson: Lesson | null;
  lastLessonLoading: boolean;
}

const initialState: LessonState = {
  trainerLessons: [],
  groupLessons: [],
  trainerLessonsLoading: false,
  groupLessonsLoading: false,
  lessonCreating: false,
  lessonUpdating: false,
  lastLesson: null,
  lastLessonLoading: false,
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
      .addCase(createLesson.pending, (state, { meta: { arg } }) => {
        state.lessonCreating = arg.groupId;
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

    builder
      .addCase(fetchLastLesson.pending, (state) => {
        state.lastLessonLoading = true;
      })
      .addCase(fetchLastLesson.fulfilled, (state, { payload: lastLesson }) => {
        state.lastLessonLoading = false;
        state.lastLesson = lastLesson;
      })
      .addCase(fetchLastLesson.rejected, (state) => {
        state.lastLessonLoading = false;
        state.lastLesson = null;
      });
  },
  selectors: {
    selectTrainerLessons: (state) => state.trainerLessons,
    selectTrainerLessonsLoading: (state) => state.trainerLessonsLoading,
    selectGroupLessons: (state) => state.groupLessons,
    selectGroupLessonsLoading: (state) => state.groupLessonsLoading,
    selectLessonCreating: (state) => state.lessonCreating,
    selectLessonUpdating: (state) => state.lessonUpdating,
    selectLastLesson: (state) => state.lastLesson,
    selectLastLessonLoading: (state) => state.lastLessonLoading,
  },
});

export const lessonsReducer = lessonsSlice.reducer;

export const {
  selectTrainerLessons,
  selectGroupLessons,
  selectGroupLessonsLoading,
  selectLessonCreating,
  selectLastLesson,
} = lessonsSlice.selectors;
