import { createSlice } from "@reduxjs/toolkit";
import {
  createTrainerProfile,
  getTrainerProfile,
  getTrainers,
  getTrainersReview,
} from "./trainersThunks.ts";
import { ITrainer, ITrainerProfile, Review } from "../../types/trainerTypes.ts";

interface TrainersState {
  trainerProfile: ITrainerProfile | null;
  trainerProfileLoading: boolean;
  trainers: ITrainer[];
  fetchingTrainers: boolean;
  creatingTrainerProfile: boolean;
  review: Review[];
  fetchReviewsLoading: boolean;
}

const initialState: TrainersState = {
  trainerProfile: null,
  trainerProfileLoading: false,
  trainers: [],
  fetchingTrainers: false,
  creatingTrainerProfile: false,
  review: [],
  fetchReviewsLoading: false,
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
        state.trainerProfile = null;
        state.creatingTrainerProfile = true;
      })
      .addCase(
        createTrainerProfile.fulfilled,
        (state, { payload: trainerProfile }) => {
          state.trainerProfile = trainerProfile;
          state.creatingTrainerProfile = false;
        },
      )
      .addCase(createTrainerProfile.rejected, (state) => {
        state.creatingTrainerProfile = false;
      });

    builder
      .addCase(getTrainersReview.pending, (state) => {
        state.fetchReviewsLoading = true;
      })
      .addCase(getTrainersReview.fulfilled, (state, { payload: review }) => {
        state.review = review;
        state.fetchReviewsLoading = false;
      })
      .addCase(getTrainersReview.rejected, (state) => {
        state.fetchReviewsLoading = false;
      });
  },
  selectors: {
    selectTrainerProfile: (state) => state.trainerProfile,
    selectTrainerProfileLoading: (state) => state.trainerProfileLoading,
    selectTrainers: (state) => state.trainers,
    selectFetchingTrainers: (state) => state.fetchingTrainers,
    selectCreatingTrainerProfile: (state) => state.creatingTrainerProfile,
    selectReview: (state) => state.review,
    selectFetchReviewsLoading: (state) => state.fetchReviewsLoading,
  },
});

export const trainersReducer = trainersSlice.reducer;

export const {
  selectTrainerProfile,
  selectTrainers,
  selectTrainerProfileLoading,
  selectCreatingTrainerProfile,
  selectFetchingTrainers,
  selectReview,
  selectFetchReviewsLoading,
} = trainersSlice.selectors;
