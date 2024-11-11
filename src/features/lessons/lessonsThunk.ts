import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lesson, LessonMutation } from "../../types/lessonTypes";
import axiosApi from "../../axiosApi";

export const createLesson = createAsyncThunk<void, LessonMutation>(
  "lessons/create",
  async (lessonMutation) => {
    try {
      const newLesson = {
        course: lessonMutation.course,
        title: lessonMutation.title,
        timeZone: lessonMutation.timeZone,
        groupLevel: Number(lessonMutation.groupLevel),
        quantityClients: Number(lessonMutation.quantityClients),
        ageLimit: Number(lessonMutation.ageLimit),
        description: lessonMutation.description,
        participants: lessonMutation.participants,
        presentUser: lessonMutation.presentUser,
      };
      await axiosApi.post<Lesson>("/lessons", newLesson);
    } catch (e) {
      throw e;
    }
  },
);
