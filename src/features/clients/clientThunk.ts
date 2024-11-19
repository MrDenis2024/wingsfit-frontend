import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClientProfile } from "./clientSlice.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { GlobalError } from "../../types/userTypes.ts";
import { FullClientProfileMutation } from "../../types/clientTypes.ts";

export const getClientProfile = createAsyncThunk<
  IClientProfile,
  string,
  { rejectValue: GlobalError }
>("clients/profile", async (id, { rejectWithValue }) => {
  try {
    const { data: client } = await axiosApi.get<IClientProfile>(
      `/clients/${id}`,
    );
    return client;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const createClientProfile = createAsyncThunk<
  void,
  FullClientProfileMutation,
  { rejectValue: GlobalError }
>(
  "clients/createClientProfile",
  async (clientProfileMutation, { rejectWithValue }) => {
    try {
      await axiosApi.post<IClientProfile>("/clients", clientProfileMutation);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
