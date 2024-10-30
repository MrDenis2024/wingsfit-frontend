import { createSlice } from "@reduxjs/toolkit";
import { GlobalError, IUser } from "../../types/userTypes";
import { googleLogin } from "./userThunk";

interface UserState {
  user: IUser | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UserState = {
  user: null,
  loginLoading: false,
  loginError: null,
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
  },
  selectors: {
    selectUser: (state) => state.user,
    selectLoginLoding: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  },
});

export const usersReducer = userSlice.reducer;

export const { unsetUser } = userSlice.actions;

export const { selectUser, selectLoginLoding, selectLoginError } =
  userSlice.selectors;
