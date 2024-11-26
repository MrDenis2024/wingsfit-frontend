import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {
  FullTrainerProfileMutation,
  ITrainer,
  ITrainerProfile,
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

export const getTrainerProfile = createAsyncThunk<ITrainerProfile, string>(
  "trainers/profile",
  async (id) => {
    const { data: trainer } = await axiosApi.get<ITrainerProfile>(
      `/trainers/${id}`,
    );
    return trainer;
  },
);
export const createTrainerProfile = createAsyncThunk<
  ITrainerProfile,
  FullTrainerProfileMutation
>("trainers/createTrainerProfile", async (trainerProfileMutation) => {
  console.log(trainerProfileMutation);
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
