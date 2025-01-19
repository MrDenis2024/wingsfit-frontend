import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lesson } from "../../types/lessonTypes";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";
import { GlobalError } from "../../types/userTypes.ts";

export const fetchTrainerLessons = createAsyncThunk<Lesson[], string>(
  "lessons/fetchAll",
  async (trainerId) => {
    const { data: lessons } = await axiosApi.get<Lesson[]>(
      `/lessons?trainer=${trainerId}`,
    );
    return lessons;
  },
);

export const fetchGroupLessons = createAsyncThunk<Lesson[], string>(
  "lessons/fetchLessonsGroup",
  async (groupId) => {
    const { data: lesson } = await axiosApi.get<Lesson[]>(
      `/lessons/${groupId}`,
    );
    return lesson;
  },
);

export const createLesson = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  "lessons/create",
  async (groupId, { rejectWithValue }) => {
    try {
      await axiosApi.post("/lessons", { groupId });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const patchLesson = createAsyncThunk<void, string>(
  "lessons/update",
  async (lessonId) => {
    try {
      await axiosApi.patch(`/lessons/${lessonId}`);
    } catch (e) {
      console.error(e);
    }
  },
);

export const fetchLastLesson = createAsyncThunk<Lesson, string>(
  "lessons/fetchLastLesson",
  async (groupId) => {
    console.log("Fetching last lesson for group:", groupId);

    const { data: lastLesson } = await axiosApi.get<Lesson>(
      `/lessons/last/${groupId}`,
    );
    return lastLesson;
  },
);
