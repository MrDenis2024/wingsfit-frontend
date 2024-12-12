import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../types/lessonTypes";
import {
  createLesson,
  fetchLesson,
  fetchLessons,
  patchLesson,
} from "./lessonsThunk";

interface LessonState {
  lessons: Lesson[];
  lesson: Lesson | null;
  lessonsLoading: boolean;
  lessonLoading: boolean;
  lessonCreating: boolean;
  lessonUpdating: boolean;
}

const initialState: LessonState = {
  lessons: [],
  lesson: null,
  lessonsLoading: false,
  lessonLoading: false,
  lessonCreating: false,
  lessonUpdating: false,
};

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.lessonsLoading = true;
      })
      .addCase(fetchLessons.fulfilled, (state, { payload: lessons }) => {
        state.lessonsLoading = false;
        state.lessons = lessons;
      })
      .addCase(fetchLessons.rejected, (state) => {
        state.lessonsLoading = false;
      });

    builder
      .addCase(fetchLesson.pending, (state) => {
        state.lessonLoading = true;
      })
      .addCase(fetchLesson.fulfilled, (state, { payload: lesson }) => {
        state.lessonLoading = false;
        state.lesson = lesson;
      })
      .addCase(fetchLesson.rejected, (state) => {
        state.lessonLoading = false;
      });

    builder
      .addCase(createLesson.pending, (state) => {
        state.lessonCreating = true;
      })
      .addCase(createLesson.fulfilled, (state, { payload: lesson }) => {
        state.lessonCreating = false;
        state.lessons.push(lesson);
      })
      .addCase(createLesson.rejected, (state) => {
        state.lessonCreating = false;
      });

    builder
      .addCase(patchLesson.pending, (state) => {
        state.lessonUpdating = true;
      })
      .addCase(patchLesson.fulfilled, (state, { payload: updatedLesson }) => {
        state.lessonUpdating = false;
        const index = state.lessons.findIndex(
          (lesson) => lesson._id === updatedLesson._id,
        );
        if (index !== -1) {
          state.lessons[index] = updatedLesson;
        }
      })
      .addCase(patchLesson.rejected, (state) => {
        state.lessonUpdating = false;
      });
  },
  selectors: {
    selectLessons: (state) => state.lessons,
    selectLessonsLoading: (state) => state.lessonsLoading,
    selectLesson: (state) => state.lesson,
    selectLessonLoading: (state) => state.lessonLoading,
    selectLessonCreating: (state) => state.lessonCreating,
    selectLessonUpdating: (state) => state.lessonUpdating,
  },
});

export const lessonsReducer = lessonsSlice.reducer;

export const {
  selectLessons,
  selectLesson,
  selectLessonsLoading,
  selectLessonLoading,
  selectLessonCreating,
  selectLessonUpdating,
} = lessonsSlice.selectors;
