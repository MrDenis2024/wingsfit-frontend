import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { ITrainer, ITrainerProfile } from "../../types/trainerTypes.ts";

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
