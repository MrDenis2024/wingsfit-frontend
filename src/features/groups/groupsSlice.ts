import { GlobalError, ValidationError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  activateClient,
  createGroup,
  deleteGroup,
  editGroup,
  fetchAllGroups,
  fetchCourseGroups,
  fetchMatchingGroups,
  freezeClient,
  getOneGroup,
  removeClient,
  updateSubscribe,
} from "./groupsThunk.ts";
import { IGroup, IMatchingGroup } from "../../types/groupTypes.ts";

export interface GroupsState {
  groupsData: IGroup[];
  fetchGroups: boolean;
  fetchCourseGroups: boolean;
  matchingGroupsData: IMatchingGroup[];
  fetchMatchingGroups: boolean;
  isCreating: boolean;
  isCreatingError: GlobalError | null;
  oneGroup: IGroup | null;
  oneGroupLoading: boolean;
  updateLoading: boolean;
  isGroupError: ValidationError | null;
  deleteGroupLoading: false | string;
  subscribeLoading: false | string;
  removeClientLoading: false | string;
  freezeClientLoading: false | string;
  activateClientLoading: false | string;
}

const initialState: GroupsState = {
  groupsData: [],
  fetchGroups: false,
  fetchCourseGroups: false,
  matchingGroupsData: [],
  fetchMatchingGroups: false,
  isCreating: false,
  isCreatingError: null,
  oneGroup: null,
  oneGroupLoading: false,
  updateLoading: false,
  isGroupError: null,
  deleteGroupLoading: false,
  subscribeLoading: false,
  removeClientLoading: false,
  freezeClientLoading: false,
  activateClientLoading: false,
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
      .addCase(fetchMatchingGroups.pending, (state) => {
        state.fetchMatchingGroups = true;
      })
      .addCase(
        fetchMatchingGroups.fulfilled,
        (state, { payload: groupsData }) => {
          state.matchingGroupsData = groupsData;
          state.fetchMatchingGroups = false;
        },
      )
      .addCase(fetchMatchingGroups.rejected, (state) => {
        state.fetchMatchingGroups = false;
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
      .addCase(updateSubscribe.pending, (state, { meta: { arg } }) => {
        state.subscribeLoading = arg.clientId;
      })
      .addCase(updateSubscribe.fulfilled, (state) => {
        state.subscribeLoading = false;
      })
      .addCase(updateSubscribe.rejected, (state) => {
        state.subscribeLoading = false;
      });

    builder
      .addCase(freezeClient.pending, (state, { meta: { arg } }) => {
        state.freezeClientLoading = arg.clientId;
      })
      .addCase(freezeClient.fulfilled, (state) => {
        state.freezeClientLoading = false;
      })
      .addCase(freezeClient.rejected, (state) => {
        state.freezeClientLoading = false;
      });

    builder
      .addCase(removeClient.pending, (state, { meta: { arg } }) => {
        state.removeClientLoading = arg.clientId;
      })
      .addCase(removeClient.fulfilled, (state) => {
        state.removeClientLoading = false;
      })
      .addCase(removeClient.rejected, (state) => {
        state.removeClientLoading = false;
      });

    builder
      .addCase(activateClient.pending, (state, { meta: { arg } }) => {
        state.activateClientLoading = arg.clientId;
      })
      .addCase(activateClient.fulfilled, (state) => {
        state.activateClientLoading = false;
      })
      .addCase(activateClient.rejected, (state) => {
        state.activateClientLoading = false;
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
    selectMatchingGroups: (state) => state.matchingGroupsData,
    selectFetchMatchingGroups: (state) => state.fetchMatchingGroups,
    selectGroupCreate: (state) => state.isCreating,
    selectGroupError: (state) => state.isCreatingError,
    selectOneGroup: (state) => state.oneGroup,
    selectOneGroupLoading: (state) => state.oneGroupLoading,
    selectGroupUpdateLoading: (state) => state.updateLoading,
    selectIsGroupError: (state) => state.isGroupError,
    selectDeleteGroupLoading: (state) => state.deleteGroupLoading,
    selectSubscribeLoading: (state) => state.subscribeLoading,
    selectRemoveClientLoading: (state) => state.removeClientLoading,
    selectFreezeClientLoading: (state) => state.freezeClientLoading,
    selectActivateClientLoading: (state) => state.activateClientLoading,
  },
});

export const groupsReducer = groupsSlice.reducer;

export const {
  selectGroupCreate,
  selectGroupError,
  selectFetchGroups,
  selectFetchCourseGroups,
  selectMatchingGroups,
  selectFetchMatchingGroups,
  selectGroups,
  selectOneGroup,
  selectOneGroupLoading,
  selectGroupUpdateLoading,
  selectIsGroupError,
  selectDeleteGroupLoading,
  selectSubscribeLoading,
  selectRemoveClientLoading,
  selectFreezeClientLoading,
  selectActivateClientLoading,
} = groupsSlice.selectors;
