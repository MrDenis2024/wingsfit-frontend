import { createSlice } from "@reduxjs/toolkit";
import {
  createTrainerProfile,
  getTrainerProfile,
  getTrainers,
} from "./trainersThunks.ts";
import { ITrainer, ITrainerProfile } from "../../types/trainerTypes.ts";

interface TrainersState {
  trainerProfile: ITrainerProfile | null;
  errorLoading: boolean;
  trainerProfileLoading: boolean;
  trainers: ITrainer[];
  fetchingTrainers: boolean;
  errorFetchingTrainers: boolean;
  creatingTrainerProfile: boolean;
}

const initialState: TrainersState = {
  trainerProfile: null,
  errorLoading: false,
  trainerProfileLoading: false,
  trainers: [],
  fetchingTrainers: false,
  errorFetchingTrainers: false,
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
        state.trainerProfileLoading = false;
        state.trainerProfile = user;
      })
      .addCase(getTrainerProfile.rejected, (state) => {
        state.trainerProfileLoading = false;
        state.errorLoading = true;
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
        state.errorFetchingTrainers = true;
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
    selectErrorFetchingTrainers: (state) => state.errorFetchingTrainers,
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
  selectErrorFetchingTrainers,
} = trainersSlice.selectors;
