import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClientProfile } from "./clientSlice.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { GlobalError } from "../../types/userTypes.ts";

export const getClientProfile = createAsyncThunk<
  IClientProfile,
  undefined,
  { rejectValue: GlobalError }
>("client/profile", async (_arg, { rejectWithValue }) => {
  try {
    const { data: client } =
      await axiosApi.get<IClientProfile>(`/clients/profile`);
    return client;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
