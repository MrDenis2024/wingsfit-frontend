import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lesson, LessonMutation } from "../../types/lessonTypes";
import axiosApi from "../../axiosApi";
import { GlobalError } from "../../types/userTypes.ts";
import { RootState } from "../../app/store.ts";
import { isAxiosError } from "axios";

export const fetchLessons = createAsyncThunk<Lesson[], void>(
  "lessons/fetchAll",
  async () => {
    const { data: lessons } = await axiosApi.get<Lesson[]>("/lessons");
    return lessons;
  },
);

export const fetchLesson = createAsyncThunk<Lesson, string>(
  "lessons/fetchById",
  async (lessonId) => {
    const { data: lesson } = await axiosApi.get<Lesson>(`/lessons/${lessonId}`);
    return lesson;
  },
);

export const createLesson = createAsyncThunk<
  Lesson,
  LessonMutation,
  { rejectValue: GlobalError; state: RootState }
>("lessons/create", async (lessonMutation, { rejectWithValue }) => {
  try {
    const newLesson = {
      course: lessonMutation.course,
      title: lessonMutation.title.trim(),
      timeZone: lessonMutation.timeZone.value,
      groupLevel: Number(lessonMutation.groupLevel),
      quantityClients: Number(lessonMutation.quantityClients),
      ageLimit: Number(lessonMutation.ageLimit),
      description: lessonMutation.description.trim(),
      participants: lessonMutation.participants || [],
      presentUser: lessonMutation.presentUser || [],
    };

    const { data: lesson } = await axiosApi.post<Lesson>("/lessons", newLesson);
    return lesson;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const patchLesson = createAsyncThunk<
  Lesson,
  { id: string; data: Partial<Lesson> },
  { rejectValue: GlobalError }
>("lessons/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const updatedData = {
      ...data,
      presentUser: data.presentUser || [], // Убедитесь, что это массив
      timeZone: data.timeZone ? data.timeZone.value : undefined,
    };

    const { data: lesson } = await axiosApi.patch<Lesson>(
      `/lessons/${id}/attendance`,
      updatedData,
    );
    return lesson;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
