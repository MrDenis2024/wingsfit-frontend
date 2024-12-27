import { GlobalError, ValidationError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  createGroup,
  deleteGroup,
  editGroup,
  fetchAllGroups,
  fetchCourseGroups,
  getOneGroup,
} from "./groupsThunk.ts";
import { IGroup } from "../../types/groupTypes.ts";

export interface GroupsState {
  groupsData: IGroup[];
  fetchGroups: boolean;
  fetchCourseGroups: boolean;
  isCreating: boolean;
  isCreatingError: GlobalError | null;
  oneGroup: IGroup | null;
  oneGroupLoading: boolean;
  updateLoading: boolean;
  isGroupError: ValidationError | null;
  deleteGroupLoading: false | string;
}

const initialState: GroupsState = {
  groupsData: [],
  fetchGroups: false,
  fetchCourseGroups: false,
  isCreating: false,
  isCreatingError: null,
  oneGroup: null,
  oneGroupLoading: false,
  updateLoading: false,
  isGroupError: null,
  deleteGroupLoading: false,
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

    builder
      .addCase(fetchAllGroups.pending, (state) => {
        state.fetchGroups = true;
      })
      .addCase(fetchAllGroups.fulfilled, (state, { payload: groupsData }) => {
        state.groupsData = groupsData;
        state.fetchGroups = false;
      })
      .addCase(fetchAllGroups.rejected, (state) => {
        state.fetchGroups = false;
      });

    builder
      .addCase(fetchCourseGroups.pending, (state) => {
        state.fetchCourseGroups = true;
      })
      .addCase(
        fetchCourseGroups.fulfilled,
        (state, { payload: groupsData }) => {
          state.groupsData = groupsData;
          state.fetchCourseGroups = false;
        },
      )
      .addCase(fetchCourseGroups.rejected, (state) => {
        state.fetchCourseGroups = false;
      });

    builder
      .addCase(getOneGroup.pending, (state) => {
        state.oneGroupLoading = true;
        state.oneGroup = null;
      })
      .addCase(getOneGroup.fulfilled, (state, { payload: oneGroup }) => {
        state.oneGroup = oneGroup;
        state.oneGroupLoading = false;
      })
      .addCase(getOneGroup.rejected, (state) => {
        state.oneGroupLoading = false;
      });

    builder
      .addCase(editGroup.pending, (state) => {
        state.updateLoading = true;
        state.isGroupError = null;
      })
      .addCase(editGroup.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(editGroup.rejected, (state, { payload: error }) => {
        state.updateLoading = false;
        state.isGroupError = error || null;
      });

    builder
      .addCase(deleteGroup.pending, (state, { meta: { arg: group } }) => {
        state.deleteGroupLoading = group;
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.deleteGroupLoading = false;
      })
      .addCase(deleteGroup.rejected, (state) => {
        state.deleteGroupLoading = false;
      });
  },
  selectors: {
    selectGroups: (state) => state.groupsData,
    selectFetchGroups: (state) => state.fetchGroups,
    selectFetchCourseGroups: (state) => state.fetchCourseGroups,
    selectGroupCreate: (state) => state.isCreating,
    selectGroupError: (state) => state.isCreatingError,
    selectOneGroup: (state) => state.oneGroup,
    selectOneGroupLoading: (state) => state.oneGroupLoading,
    selectGroupUpdateLoading: (state) => state.updateLoading,
    selectIsGroupError: (state) => state.isGroupError,
    selectDeleteGroupLoading: (state) => state.deleteGroupLoading,
  },
});

export const groupsReducer = groupsSlice.reducer;

export const {
  selectGroupCreate,
  selectGroupError,
  selectFetchGroups,
  selectFetchCourseGroups,
  selectGroups,
  selectOneGroup,
  selectOneGroupLoading,
  selectGroupUpdateLoading,
  selectIsGroupError,
  selectDeleteGroupLoading,
} = groupsSlice.selectors;
