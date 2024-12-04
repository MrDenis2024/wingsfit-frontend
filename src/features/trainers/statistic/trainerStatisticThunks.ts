import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TrainerStatisticClient,
  TrainerStatisticGroup,
} from "../../../types/trainerStatisticTypes.ts";
import axiosApi from "../../../axiosApi.ts";

export const getStatisticGroup = createAsyncThunk<
  TrainerStatisticGroup[],
  void
>("trainerStatistic/getGroup", async () => {
  const { data: statisticGroup } = await axiosApi.get<TrainerStatisticGroup[]>(
    "/trainerStatistics/groups",
  );
  return statisticGroup;
});

export const getStatisticClient = createAsyncThunk<
  TrainerStatisticClient[],
  void
>("trainerStatistic/getClient", async () => {
  const { data: statisticClient } = await axiosApi.get<
    TrainerStatisticClient[]
  >("/trainerStatistics/clients");
  return statisticClient;
});
