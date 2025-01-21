import { createAsyncThunk } from "@reduxjs/toolkit";
import { MessageNotification } from "../../types/chatTypes.ts";
import { RootState } from "../../app/store.ts";
import { GlobalError } from "../../types/userTypes.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { IGroup } from "../../types/groupTypes.ts";
import { ICourse } from "../../types/courseTypes.ts";
import {
  CourseToday,
  EndedSubscription,
} from "../../types/notificationTypes.ts";
import { ITrainer } from "../../types/trainerTypes.ts";
import { Lesson } from "../../types/lessonTypes.ts";

export const getUnreadMessages = createAsyncThunk<
  MessageNotification[],
  void,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>("notifications/getUnreadMessages", async (_, { rejectWithValue }) => {
  try {
    const { data: groupChatsUnreadMessages } = await axiosApi.get<
      MessageNotification[]
    >("/chats/groupChatsUnreadMessages");
    const { data: privateChatsUnreadMessages } = await axiosApi.get<
      MessageNotification[]
    >("/chats/privateChatsUnreadMessages");
    const messages = groupChatsUnreadMessages.concat(
      privateChatsUnreadMessages,
    );

    return messages;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const getCoursesToday = createAsyncThunk<
  CourseToday[],
  void,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>("notifications/getClassesToday", async (_, { rejectWithValue }) => {
  try {
    const { data: groups } = await axiosApi.get<IGroup[]>("/groups");
    let coursesToday: CourseToday[] = [];
    await Promise.all(
      groups.map(async (group) => {
        const { data: course } = await axiosApi.get<ICourse>(
          `/courses/${group.course._id}`,
        );
        const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
        const today = new Date().getDay();

        if (course.schedule.includes(days[today])) {
          coursesToday = [...coursesToday, { course, group }];
        }
      }),
    );
    return coursesToday;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const getEndedSubscription = createAsyncThunk<
  EndedSubscription[],
  void,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>(
  "notifications/getEndedSubscription",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user = state.users.user;

      if (!user) {
        throw new Error("Пользователь не авторизован");
      }
      const endedSubscription: EndedSubscription[] = [];
      if (user.role === "trainer") {
        const { data: groups } = await axiosApi.get<IGroup[]>("/groups");
        const date = new Date();
        groups.map((group) => {
          group.clients.map((client) => {
            const dateSubscription = new Date(client.subscribeEnd);
            if (dateSubscription <= date) {
              endedSubscription.push({
                message: `У участника группы "${group.title}" - ${client.client.firstName} ${client.client.lastName} закончилась подписка!`,
                courseId: group._id,
              });
            }
          });
        });
      } else if (user.role === "client") {
        const { data: groups } = await axiosApi.get<IGroup[]>("/groups");
        const date = new Date();
        groups.map((group) => {
          group.clients.map((client) => {
            const dateSubscription = new Date(client.subscribeEnd);
            const dateInThreeDays = new Date(date); // Создаем копию текущей даты
            dateInThreeDays.setDate(date.getDate() + 3);
            if (
              client.client._id === user._id &&
              dateSubscription.getTime() <= date.getTime()
            ) {
              endedSubscription.push({
                message: `У вас закончилась подписка на курс - ${group.course.title}`,
                courseId: group.course._id,
              });
            } else if (
              client.client._id === user._id &&
              dateSubscription.getTime() <= dateInThreeDays.getTime()
            ) {
              endedSubscription.push({
                message: `У вас скоро закончится подписка на курс - ${group.course.title}`,
                courseId: group.course._id,
              });
            }
          });
        });
      }
      return endedSubscription;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const getStartedLessons = createAsyncThunk<
  Lesson[],
  void,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>(
  "notifications/getStartedLessons",
  async (_, { getState, rejectWithValue }) => {
    try {
      const clientId = getState().clients.clientProfile?._id;
      let lessons: Lesson[] = [];
      const datetime = new Date().getTime();
      const { data: trainers } = await axiosApi.get<ITrainer[]>(
        `/trainers?clientId=${clientId}`,
      );
      await Promise.all(
        trainers.map(async (trainer) => {
          const { data: lessonsTrainer } = await axiosApi.get<Lesson[]>(
            `/lessons?trainer=${trainer.user._id}`,
          );
          lessonsTrainer.map((lesson) => {
            const created = new Date(lesson.createdAt).getTime();
            if (datetime >= created && datetime <= created + 30 * 60 * 1000) {
              lessons = [...lessons, lesson];
            }
          });
        }),
      );

      return lessons;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
