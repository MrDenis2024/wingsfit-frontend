import {createSlice} from "@reduxjs/toolkit";
import {getTrainerProfile} from "./trainersThunks.ts";
import {ITrainerProfile} from "../../types/trainerTypes.ts";

interface TrainerState {
  trainerProfile: ITrainerProfile | null;
  errorLoading: boolean;
  oneTrainerLoading: boolean;
}

const initialState: TrainerState = {
  trainerProfile: null,
  errorLoading: false,
  oneTrainerLoading: false,
};

export const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrainerProfile.pending, (state) => {
      state.oneTrainerLoading = true;
    });
    builder.addCase(getTrainerProfile.fulfilled, (state, {payload: user}) => {
      state.oneTrainerLoading = false;
      state.trainerProfile = user;
    });
    builder.addCase(getTrainerProfile.rejected, (state) => {
      state.oneTrainerLoading = false;
      state.errorLoading = true;
    });
  },
  selectors: {
    selectTrainerProfile: (state) => state.trainerProfile,
  },
});

export const trainersReducer = trainersSlice.reducer;

export const {selectTrainerProfile} = trainersSlice.selectors;
