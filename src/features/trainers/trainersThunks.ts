import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {
  FullTrainerProfileMutation,
  ITrainer,
  ITrainerProfile,
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
  void,
  FullTrainerProfileMutation
>("trainers/createTrainerProfile", async (trainerProfilkeMutation) => {
  await axiosApi.post("/trainers", trainerProfilkeMutation);
});
