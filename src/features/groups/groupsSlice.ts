import { GlobalError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import { createGroup } from "./groupsThunk.ts";

export interface GroupsState {
  isCreating: boolean;
  isCreatingError: GlobalError | null;
}

const initialState: GroupsState = {
  isCreating: false,
  isCreatingError: null,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.isCreating = true;
        state.isCreatingError = null;
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createGroup.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.isCreatingError = error || null;
      });
  },
  selectors: {
    selectGroupCreate: (state) => state.isCreating,
    selectGroupError: (state) => state.isCreatingError,
  },
});

export const groupsReducer = groupsSlice.reducer;

export const { selectGroupCreate, selectGroupError } = groupsSlice.selectors;
