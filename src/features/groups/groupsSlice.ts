import {GlobalError} from "../../types/userTypes.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createGroup, deleteGroup, fetchAllGroups, fetchCourseGroups,} from "./groupsThunk.ts";
import {IGroup} from "../../types/groupTypes.ts";

export interface GroupsState {
  groupsData: IGroup[];
  fetchGroups: boolean;
  fetchCourseGroups: boolean;
  isCreating: boolean;
  isCreatingError: GlobalError | null;
  deleteGroupLoading: false | string;
}

const initialState: GroupsState = {
  groupsData: [],
  fetchGroups: false,
  fetchCourseGroups: false,
  isCreating: false,
  isCreatingError: null,
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
  selectDeleteGroupLoading,
} = groupsSlice.selectors;
