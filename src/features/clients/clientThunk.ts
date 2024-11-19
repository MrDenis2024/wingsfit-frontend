import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClientProfile } from "../../types/clientTypes.ts";
import axiosApi from "../../axiosApi.ts";

export const getClientProfile = createAsyncThunk<IClientProfile, string>(
  "clients/profile",
  async (id) => {
    const { data: client } = await axiosApi.get<IClientProfile>(
      `/clients/${id}`,
    );
    return client;
  },
);
