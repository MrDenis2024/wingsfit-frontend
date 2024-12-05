import { createSlice } from "@reduxjs/toolkit";
import {
  createTrainerProfile, deleteCertificate,
  getTrainerProfile,
  getTrainers,
  getTrainersReview,
} from "./trainersThunks.ts";
import { ITrainer, Review } from "../../types/trainerTypes.ts";

interface TrainersState {
  trainerProfile: ITrainer | null;
  oneTrainer: ITrainer | null;
  fetchOneTrainer: boolean;
  trainerProfileLoading: boolean;
  trainers: ITrainer[];
  fetchingTrainers: boolean;
  creatingTrainerProfile: boolean;
  review: Review[];
  fetchReviewsLoading: boolean;
  deleteLoading: string | false;
}

const initialState: TrainersState = {
  trainerProfile: null,
  trainerProfileLoading: false,
  oneTrainer: null,
  fetchOneTrainer: false,
  trainers: [],
  fetchingTrainers: false,
  creatingTrainerProfile: false,
  review: [],
  fetchReviewsLoading: false,
  deleteLoading: false,
};

export const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrainerProfile.pending, (state) => {
        state.oneTrainer = null;
        state.trainerProfileLoading = true;
        state.fetchOneTrainer = true;
      })
      .addCase(getTrainerProfile.fulfilled, (state, { payload }) => {
        if (payload.user._id === state.trainerProfile?.user._id) {
          state.trainerProfile = payload;
        } else {
          state.oneTrainer = payload;
        }
        state.trainerProfileLoading = false;
        state.fetchOneTrainer = false;
      })
      .addCase(getTrainerProfile.rejected, (state) => {
        state.trainerProfileLoading = false;
        state.fetchOneTrainer = false;
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
    builder
        .addCase(deleteCertificate.pending, (state, { meta: { arg: trackId } }) => {
          state.deleteLoading = trackId;
        })
        .addCase(deleteCertificate.fulfilled, (state) => {
          state.deleteLoading = false;
        })
        .addCase(deleteCertificate.rejected, (state) => {
          state.deleteLoading = false;
        });
  },
  selectors: {
    selectTrainerProfile: (state) => state.trainerProfile,
    selectTrainerProfileLoading: (state) => state.trainerProfileLoading,
    selectOneTrainer: (state) => state.oneTrainer,
    selectOneTrainerLoading: (state) => state.fetchOneTrainer,
    selectTrainers: (state) => state.trainers,
    selectFetchingTrainers: (state) => state.fetchingTrainers,
    selectCreatingTrainerProfile: (state) => state.creatingTrainerProfile,
    selectReview: (state) => state.review,
    selectFetchReviewsLoading: (state) => state.fetchReviewsLoading,
    selectDeleteCertificateLoading: (state) => state.deleteLoading,
  },
});

export const trainersReducer = trainersSlice.reducer;

export const {
  selectTrainerProfile,
  selectTrainers,
  selectTrainerProfileLoading,
  selectCreatingTrainerProfile,
  selectFetchingTrainers,
  selectOneTrainer,
  selectOneTrainerLoading,
  selectReview,
  selectFetchReviewsLoading,
} = trainersSlice.selectors;
