import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClientProfile } from "./clientSlice.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { GlobalError } from "../../types/userTypes.ts";

export const getClientProfile = createAsyncThunk<
  IClientProfile,
  string,
  { rejectValue: GlobalError }
>("client/profile", async (id: string, { rejectWithValue }) => {
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
