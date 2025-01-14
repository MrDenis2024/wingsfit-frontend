import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lesson } from "../../types/lessonTypes";
import axiosApi from "../../axiosApi";

export const fetchTrainerLessons = createAsyncThunk<Lesson[],  string>(
  "lessons/fetchAll",
  async (trainerId) => {
    const { data: lessons } = await axiosApi.get<Lesson[]>(`/lessons?trainer=${trainerId}`);
    return lessons;
  },
);

export const fetchGroupLessons = createAsyncThunk<Lesson[], string>(
  "lessons/fetchLessonsGroup",
  async (groupId) => {
    const { data: lesson } = await axiosApi.get<Lesson[]>(`/lessons/${groupId}`);
    return lesson;
  },
);

export const createLesson = createAsyncThunk<void, string>(
  "lessons/create",
  async (groupId,) => {
    await axiosApi.post("/lessons", { groupId });
});

export const patchLesson = createAsyncThunk<void, string>(
  "lessons/update",
  async (lessonId) => {
    try {
      await axiosApi.patch(`/lessons/${lessonId}`);

    } catch (e) {
      console.error(e);
    }
});
