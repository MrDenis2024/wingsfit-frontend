import { createSlice } from "@reduxjs/toolkit";
import {
  createTrainerProfile,
  deleteCertificate,
  getTrainerProfile,
  getTrainers,
  getTrainersReview,
} from "./trainersThunks.ts";
import { ITrainer, Review } from "../../types/trainerTypes.ts";
import { GlobalError } from "../../types/userTypes.ts";

interface TrainersState {
  trainerProfile: ITrainer | null;
  oneTrainer: ITrainer | null;
  trainerProfileError: GlobalError | null;
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
  trainerProfileError: null,
  oneTrainer: null,
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
  reducers: {
    resetTrainerError: (state) => {
      state.trainerProfileError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrainerProfile.pending, (state) => {
        state.oneTrainer = null;
        state.trainerProfileLoading = true;
      })
      .addCase(getTrainerProfile.fulfilled, (state, { payload }) => {
        if (payload.isUserProfile) {
          state.trainerProfile = payload.trainer;
        } else {
          state.oneTrainer = payload.trainer;
        }
        state.trainerProfileLoading = false;
      })
      .addCase(getTrainerProfile.rejected, (state, { payload: error }) => {
        state.trainerProfileError = error || null;
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
    builder
      .addCase(
        deleteCertificate.pending,
        (state, { meta: { arg: trackId } }) => {
          state.deleteLoading = trackId;
        },
      )
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
    selectTrainers: (state) => state.trainers,
    selectFetchingTrainers: (state) => state.fetchingTrainers,
    selectCreatingTrainerProfile: (state) => state.creatingTrainerProfile,
    selectReview: (state) => state.review,
    selectFetchReviewsLoading: (state) => state.fetchReviewsLoading,
    selectTrainerProfileError: (state) => state.trainerProfileError,
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
  selectReview,
  selectFetchReviewsLoading,
  selectTrainerProfileError,
  selectDeleteCertificateLoading,
} = trainersSlice.selectors;
export const { resetTrainerError } = trainersSlice.actions;
