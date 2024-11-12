import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { GlobalError } from "../../types/userTypes.ts";
import {ITrainer, ITrainerProfile} from "../../types/trainerTypes.ts";

export const getTrainers = createAsyncThunk<ITrainer[], undefined, { rejectValue: GlobalError }>("trainers/fetchAll", async (_arg, { rejectWithValue }) => {
  try {
    const { data: trainers } = await axiosApi.get<ITrainer[]>(`/trainers/`);

    if (!trainers) {
      return [];
    }

    return trainers;

  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getTrainerProfile = createAsyncThunk<
  ITrainerProfile,
  undefined,
  { rejectValue: GlobalError }
>("trainers/profile", async (_arg, { rejectWithValue }) => {
  try {
    const { data: trainer } = await axiosApi.get<ITrainerProfile>(`/trainers/`);
    return trainer;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
