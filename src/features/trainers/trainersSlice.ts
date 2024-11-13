import { createSlice } from "@reduxjs/toolkit";
import { getTrainerProfile, getTrainers } from "./trainersThunks.ts";
import { ITrainer, ITrainerProfile } from "../../types/trainerTypes.ts";

interface TrainersState {
  trainerProfile: ITrainerProfile | null;
  errorLoading: boolean;
  oneTrainerLoading: boolean;
  trainers: ITrainer[];
  fetchingTrainers: boolean;
  errorFetchingTrainers: boolean;
}

const initialState: TrainersState = {
  trainerProfile: null,
  errorLoading: false,
  oneTrainerLoading: false,
  trainers: [],
  fetchingTrainers: false,
  errorFetchingTrainers: false,
};

export const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrainerProfile.pending, (state) => {
        state.oneTrainerLoading = true;
      })
      .addCase(getTrainerProfile.fulfilled, (state, { payload: user }) => {
        state.oneTrainerLoading = false;
        state.trainerProfile = user;
      })
      .addCase(getTrainerProfile.rejected, (state) => {
        state.oneTrainerLoading = false;
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
  },
  selectors: {
    selectTrainerProfile: (state) => state.trainerProfile,
    selectTrainers: (state) => state.trainers,
    selectFetchingTrainers: (state) => state.fetchingTrainers,
    selectErrorFetchingTrainers: (state) => state.errorFetchingTrainers,
  },
});

export const trainersReducer = trainersSlice.reducer;

export const {
  selectTrainerProfile,
  selectTrainers,
  selectFetchingTrainers,
  selectErrorFetchingTrainers,
} = trainersSlice.selectors;
