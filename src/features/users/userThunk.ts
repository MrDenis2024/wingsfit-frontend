import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  UserProfile,
  UserLogin,
  UserMutation,
  ValidationError,
} from "../../types/userTypes";
import { isAxiosError } from "axios";
import axiosApi from "../../axiosApi";
import { unsetUser } from "./userSlice.ts";
import { AdminMutation } from "../../types/adminTypes.ts";

export const reloadUser = createAsyncThunk<UserProfile>(
  "users/reload",
  async () => {
    const { data: user } = await axiosApi.get("/users/reload");
    return user;
  },
);

export const googleLogin = createAsyncThunk<
  UserProfile,
  { credential: string; role: string | null },
  { rejectValue: GlobalError }
>("users/googleLogin", async (userMutation, { rejectWithValue }) => {
  try {
    if (userMutation.role !== "trainer" && userMutation.role !== "client") {
      return rejectWithValue({
        error: "Role not found!",
      });
    }

    const { data: user } = await axiosApi.post<UserProfile>(
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
  UserProfile,
  RegisterArg,
  { rejectValue: ValidationError }
>("users/register", async ({ userMutation, role }, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<UserProfile>(
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
  UserProfile,
  UserLogin,
  { rejectValue: GlobalError }
>("users/login", async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<UserProfile>(
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

export const loginAdmin = createAsyncThunk<
  UserProfile,
  AdminMutation,
  { rejectValue: GlobalError }
>("users/loginAdmin", async (loginMutation, { rejectWithValue }) => {
  try {
    const { data: user } = await axiosApi.post<UserProfile>(
      "/admins/sessionsAdmin",
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

export const logout = createAsyncThunk(
  "users/logout",
  async (_arg, { dispatch }) => {
    await axiosApi.delete("/users/sessions");
    dispatch(unsetUser());
  },
);
