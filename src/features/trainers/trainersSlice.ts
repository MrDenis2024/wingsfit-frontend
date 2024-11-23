import { createSlice } from "@reduxjs/toolkit";
import {
  createTrainerProfile,
  getTrainerProfile,
  getTrainers,
} from "./trainersThunks.ts";
import { ITrainer, ITrainerProfile } from "../../types/trainerTypes.ts";

interface TrainersState {
  oneTrainer: ITrainerProfile | null;
  oneTrainerLoading: boolean;
  trainerProfile: ITrainerProfile | null;
  trainerProfileLoading: boolean;
  trainers: ITrainer[];
  fetchingTrainers: boolean;
  creatingTrainerProfile: boolean;
}

const initialState: TrainersState = {
  oneTrainer: null,
  oneTrainerLoading: false,
  trainerProfile: null,
  trainerProfileLoading: false,
  trainers: [],
  fetchingTrainers: false,
  creatingTrainerProfile: false,
};

export const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrainerProfile.pending, (state) => {
        state.trainerProfileLoading = true;
      })
      .addCase(getTrainerProfile.fulfilled, (state, { payload: user }) => {
        state.trainerProfile = user;
        state.trainerProfileLoading = false;
      })
      .addCase(getTrainerProfile.rejected, (state) => {
        state.trainerProfileLoading = false;
      });

    builder
      .addCase(getTrainers.pending, (state) => {
        state.fetchingTrainers = true;
      })
      .addCase(getTrainers.fulfilled, (state, { payload: trainers }) => {
        state.fetchingTrainers = false;
        state.trainers = trainers;
      })
      .addCase(getTrainers.rejected, (state) => {
        state.fetchingTrainers = false;
      });
    builder
      .addCase(createTrainerProfile.pending, (state) => {
        state.creatingTrainerProfile = true;
      })
      .addCase(createTrainerProfile.fulfilled, (state) => {
        state.creatingTrainerProfile = false;
      })
      .addCase(createTrainerProfile.rejected, (state) => {
        state.creatingTrainerProfile = false;
      });
  },
  selectors: {
    selectTrainerProfile: (state) => state.trainerProfile,
    selectTrainerProfileLoading: (state) => state.trainerProfileLoading,
    selectTrainers: (state) => state.trainers,
    selectFetchingTrainers: (state) => state.fetchingTrainers,
    selectCreatingTrainerProfile: (state) => state.creatingTrainerProfile,
  },
});

export const trainersReducer = trainersSlice.reducer;

export const {
  selectTrainerProfile,
  selectTrainers,
  selectTrainerProfileLoading,
  selectCreatingTrainerProfile,
  selectFetchingTrainers,
} = trainersSlice.selectors;
