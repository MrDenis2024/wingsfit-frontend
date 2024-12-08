import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { FullClientProfileMutation, IClient } from "../../types/clientTypes.ts";
import { GlobalError } from "../../types/userTypes.ts";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const getClientProfile = createAsyncThunk<
  IClient,
  string,
  { state: RootState; rejectValue: GlobalError }
>("clients/profile", async (id, { getState, rejectWithValue }) => {
  const user = getState().users.user?._id;
  try {
    const { data: client } = await axiosApi.get<IClient>(`/clients/${id}`);
    return client;
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response &&
      e.response.status === 404 &&
      user === id
    ) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

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

export const fetchUpdateAvatarClient = createAsyncThunk<
  IClient,
  File | null,
  { rejectValue: GlobalError }
>("users/fetchUpdateAvatarClient", async (avatar, { rejectWithValue }) => {
  const formData = new FormData();
  if (avatar) {
    formData.append("avatar", avatar);
  }

  try {
    const response = await axiosApi.patch<IClient>("/users/avatar", formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
