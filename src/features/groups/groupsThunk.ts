import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "../../types/userTypes.ts";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { GroupMutation, IGroup } from "../../types/groupTypes.ts";

export const fetchAllGroups = createAsyncThunk<IGroup[], void>(
  "groups/fetchAll",
  async () => {
    const { data: groupsData } = await axiosApi.get<IGroup[]>("/groups");

    if (!groupsData) {
      return [];
    }

    return groupsData;
  },
);

export const fetchCourseGroups = createAsyncThunk<IGroup[], string>(
  "groups/fetchCourseGroups",
  async (courseId) => {
    const { data: groupsData } = await axiosApi.get<IGroup[]>(
      "/groups?course=" + courseId,
    );

    if (!groupsData) {
      return [];
    }

    return groupsData;
  },
);

export const createGroup = createAsyncThunk<
  void,
  GroupMutation,
  { rejectValue: GlobalError; state: RootState }
>("groups/create", async (groupMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post(
      `/groups?course=${groupMutation.course}`,
      groupMutation,
    );
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const deleteGroup = createAsyncThunk<void, string>(
  "groups/deleteGroup",
  async (id) => {
    await axiosApi.delete(`/groups/${id}`);
  },
);
