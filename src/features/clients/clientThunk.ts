import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClientProfile } from "./clientSlice.ts";
import axiosApi from "../../axiosApi.ts";
import { FullClientProfileMutation } from "../../types/clientTypes.ts";

export const getClientProfile = createAsyncThunk<IClientProfile, string>(
  "clients/profile",
  async (id) => {
    const { data: client } = await axiosApi.get<IClientProfile>(
      `/clients/${id}`,
    );
    return client;
  },
);

export const createClientProfile = createAsyncThunk<
  void,
  FullClientProfileMutation
>("clients/createClientProfile", async (clientProfileMutation) => {
  await axiosApi.post<IClientProfile>("/clients", clientProfileMutation);
});
