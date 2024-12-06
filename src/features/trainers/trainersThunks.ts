import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {
  FullTrainerProfileMutation,
  ITrainer,
  Review,
} from "../../types/trainerTypes.ts";

export const getTrainers = createAsyncThunk<ITrainer[]>(
  "trainers/fetchAll",
  async () => {
    const { data: trainers } = await axiosApi.get<ITrainer[]>(`/trainers/`);
    if (!trainers) {
      return [];
    }
    return trainers;
  },
);

export const getTrainerProfile = createAsyncThunk<ITrainer, string>(
  "trainers/profile",
  async (id) => {
    const { data: trainer } = await axiosApi.get<ITrainer>(`/trainers/${id}`);
    return trainer;
  },
);
export const createTrainerProfile = createAsyncThunk<
  ITrainer,
  FullTrainerProfileMutation
>("trainers/createTrainerProfile", async (trainerProfileMutation) => {
  const { data: trainerProfile } = await axiosApi.post(
    "/trainers",
    trainerProfileMutation,
  );

  return trainerProfile;
});

export const getTrainersReview = createAsyncThunk<Review[], string>(
  "trainers/getReview",
  async (trainerId) => {
    const { data: review } = await axiosApi.get<Review[]>(
      `/review/${trainerId}`,
    );
    return review;
  },
);

export const editTrainer = createAsyncThunk<void, FullTrainerProfileMutation>(
  "trainers/edit",
  async (trainerProfileMutation) => {
    await axiosApi.put("/trainers", trainerProfileMutation);
  },
);
