import {createSlice} from "@reduxjs/toolkit";
import {GlobalError, UserProfile, ValidationError,} from "../../types/userTypes";
import {googleLogin, login, loginAdmin, register, reloadUser,} from "./userThunk";

interface UserState {
  user: UserProfile | null;
  reloadUser: boolean;
  loginLoading: boolean;
  loginError: GlobalError | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  adminLoginLoading: boolean;
  adminLoginError: GlobalError | null;
}

const initialState: UserState = {
  user: null,
  reloadUser: false,
  loginLoading: false,
  loginError: null,
  registerLoading: false,
  registerError: null,
  adminLoginLoading: false,
  adminLoginError: null,
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
    builder
      .addCase(reloadUser.pending, (state) => {
        state.reloadUser = true;
      })
      .addCase(reloadUser.fulfilled, (state, { payload: user }) => {
        state.user = user;
        state.reloadUser = false;
      })
      .addCase(reloadUser.rejected, (state) => {
        state.reloadUser = false;
      });
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
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.adminLoginLoading = true;
        state.adminLoginError = null;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload: user }) => {
        state.adminLoginLoading = false;
        state.user = user;
      })
      .addCase(loginAdmin.rejected, (state, { payload: error }) => {
        state.adminLoginLoading = false;
        state.adminLoginError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectReloadUser: (state) => state.reloadUser,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginAdminLoading: (state) => state.adminLoginLoading,
    selectLoginAdminError: (state) => state.adminLoginError,
  },
});

export const usersReducer = userSlice.reducer;

export const { unsetUser } = userSlice.actions;

export const {
  selectUser,
  selectReloadUser,
  selectLoginLoading,
  selectLoginError,
  selectRegisterLoading,
  selectRegisterError,
  selectLoginAdminLoading,
  selectLoginAdminError,
} = userSlice.selectors;
