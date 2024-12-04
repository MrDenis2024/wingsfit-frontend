import {
  TrainerStatisticClient,
  TrainerStatisticGroup,
} from "../../../types/trainerStatisticTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  getStatisticClient,
  getStatisticGroup,
} from "./trainerStatisticThunks.ts";

interface TrainerStatistic {
  statisticGroup: TrainerStatisticGroup[];
  statisticClient: TrainerStatisticClient[];
  filters: { dateRange: { start: string; end: string } };
  loadingStatisticClient: boolean;
  loadingStatisticGroup: boolean;
}

const initialState: TrainerStatistic = {
  statisticGroup: [],
  statisticClient: [],
  filters: { dateRange: { start: "", end: "" } },
  loadingStatisticClient: false,
  loadingStatisticGroup: false,
};

export const trainerStatisticSlice = createSlice({
  name: "trainerStatistic",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatisticGroup.pending, (state: TrainerStatistic) => {
        state.loadingStatisticGroup = true;
      })
      .addCase(
        getStatisticGroup.fulfilled,
        (state: TrainerStatistic, { payload: statisticGroup }) => {
          state.loadingStatisticGroup = false;
          state.statisticGroup = statisticGroup;
        },
      )
      .addCase(getStatisticGroup.rejected, (state: TrainerStatistic) => {
        state.loadingStatisticGroup = false;
      });

    builder
      .addCase(getStatisticClient.pending, (state: TrainerStatistic) => {
        state.loadingStatisticClient = true;
      })
      .addCase(
        getStatisticClient.fulfilled,
        (state: TrainerStatistic, { payload: statisticClient }) => {
          state.loadingStatisticClient = false;
          state.statisticClient = statisticClient;
        },
      )
      .addCase(getStatisticClient.rejected, (state: TrainerStatistic) => {
        state.loadingStatisticClient = false;
      });
  },
  selectors: {
    selectStatisticGroup: (state: TrainerStatistic) => state.statisticGroup,
    selectLoadingStatisticGroup: (state: TrainerStatistic) =>
      state.loadingStatisticGroup,
    selectStatisticClient: (state: TrainerStatistic) => state.statisticClient,
    selectLoadingStatisticClient: (state: TrainerStatistic) =>
      state.loadingStatisticClient,
  },
});

export const trainerStatisticReducer = trainerStatisticSlice.reducer;
export const {
  selectStatisticGroup,
  selectLoadingStatisticGroup,
  selectStatisticClient,
  selectLoadingStatisticClient,
} = trainerStatisticSlice.selectors;
