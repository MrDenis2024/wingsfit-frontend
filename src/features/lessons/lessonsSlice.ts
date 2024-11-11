import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../types/lessonTypes";
import { createLesson } from "./lessonsThunk";

interface LessonState {
  lessons: Lesson[];
  lessonsLoading: boolean;
}

const initialState: LessonState = {
  lessons: [],
  lessonsLoading: false,
};

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLesson.pending, (state) => {
        state.lessonsLoading = true;
      })
      .addCase(createLesson.fulfilled, (state) => {
        state.lessonsLoading = false;
      })
      .addCase(createLesson.rejected, (state) => {
        state.lessonsLoading = false;
      });
  },
  selectors: {
    selectLessons: (state) => state.lessons,
    selectLessonsLoading: (state) => state.lessonsLoading,
  },
});

export const lessonsReducer = lessonsSlice.reducer;

export const { selectLessons, selectLessonsLoading } = lessonsSlice.selectors;
