import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { FullClientProfileMutation, IClient } from "../../types/clientTypes.ts";

export const getClientProfile = createAsyncThunk<IClient, string>(
  "clients/profile",
  async (id) => {
    const { data: client } = await axiosApi.get<IClient>(`/clients/${id}`);
    return client;
  },
);

export const createClientProfile = createAsyncThunk<
  IClient,
  FullClientProfileMutation
>("clients/createClientProfile", async (clientProfileMutation) => {
  const { data: clientProfile } = await axiosApi.post<IClient>(
    "/clients",
    clientProfileMutation,
  );

  return clientProfile;
});
