import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {
  FullClientProfileMutation,
  IClientProfile,
} from "../../types/clientTypes.ts";

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
  IClientProfile,
  FullClientProfileMutation
>("clients/createClientProfile", async (clientProfileMutation) => {
  const { data: clientProfile } = await axiosApi.post<IClientProfile>(
    "/clients",
    clientProfileMutation,
  );

  return clientProfile;
});
