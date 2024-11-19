import { createSlice } from "@reduxjs/toolkit";
import { getTrainerProfile, getTrainers } from "./trainersThunks.ts";
import { ITrainer, ITrainerProfile } from "../../types/trainerTypes.ts";

interface TrainersState {
  trainerProfile: ITrainerProfile | null;
  trainerProfileLoading: boolean;
  trainers: ITrainer[];
  fetchingTrainers: boolean;
}

const initialState: TrainersState = {
  trainerProfile: null,
  trainerProfileLoading: false,
  trainers: [],
  fetchingTrainers: false,
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
        state.trainers = trainers;
        state.fetchingTrainers = false;
      })
      .addCase(getTrainers.rejected, (state) => {
        state.fetchingTrainers = false;
      });
  },
  selectors: {
    selectTrainerProfile: (state) => state.trainerProfile,
    selectTrainerProfileLoading: (state) => state.trainerProfileLoading,
    selectTrainers: (state) => state.trainers,
    selectFetchingTrainers: (state) => state.fetchingTrainers,
  },
});

export const trainersReducer = trainersSlice.reducer;

export const {
  selectTrainerProfile,
  selectTrainers,
  selectTrainerProfileLoading,
  selectFetchingTrainers,
} = trainersSlice.selectors;
