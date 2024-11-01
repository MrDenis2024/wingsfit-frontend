import { createSlice } from "@reduxjs/toolkit";
import {GlobalError, IUser, ValidationError} from "../../types/userTypes";
import {googleLogin, register} from "./userThunk";

interface UserState {
  user: IUser | null;
  profile: null
  loginLoading: boolean;
  loginError: GlobalError | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UserState = {
  user: null,
  profile: null,
  loginLoading: false,
  loginError: null,
  registerLoading: false,
  registerError: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder
        .addCase(register.pending, (state) => {
          state.registerLoading = true;
          state.registerError = null;
        })
        .addCase(register.fulfilled, (state, { payload: user }) => {
          state.registerLoading = false;
          state.user = user;
          state.profile = null;
        })
        .addCase(register.rejected, (state, { payload: error }) => {
          state.registerLoading = false;
          state.registerError = error || null;
        });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectLoginLoding: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
  },
});

export const usersReducer = userSlice.reducer;

export const { unsetUser } = userSlice.actions;

export const { selectUser, selectLoginLoding, selectLoginError, selectRegisterLoading, selectRegisterError, } =
  userSlice.selectors;
