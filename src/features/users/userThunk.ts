import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  IUser,
  UserLogin,
  UserMutation,
  ValidationError,
} from "../../types/userTypes";
import { isAxiosError } from "axios";
import axiosApi from "../../axiosApi";

export const googleLogin = createAsyncThunk<
  IUser,
  { credential: string; role: string | null },
  { rejectValue: GlobalError }
>("users/googleLogin", async (userMutation, { rejectWithValue }) => {
  try {
    if (userMutation.role !== "trainer" && userMutation.role !== "client") {
      return rejectWithValue({
        error: "Role not found!",
      });
    }

    const { data: user } = await axiosApi.post<IUser>(
      `/users/google?role=${userMutation.role}`,
      { credential: userMutation.credential },
    );

    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export interface RegisterArg {
  userMutation: UserMutation;
  role: string;
}

export const register = createAsyncThunk<
  IUser,
  RegisterArg,
  { rejectValue: ValidationError }
>("users/register", async ({ userMutation, role }, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<IUser>(
      `/users?role=${role}`,
      userMutation,
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  IUser,
  UserLogin,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<IUser>(
      "/users/sessions",
      loginMutation,
    );
    return user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
