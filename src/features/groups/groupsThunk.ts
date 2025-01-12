import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError, ValidationError } from "../../types/userTypes.ts";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import {
  GroupMutation,
  IGroup,
  IMatchingGroup,
  UpdateGroupArg,
} from "../../types/groupTypes.ts";

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

export const fetchMatchingGroups = createAsyncThunk<IMatchingGroup[], void>(
  "groups/fetchMatching",
  async () => {
    const { data: groupsData } =
      await axiosApi.get<IMatchingGroup[]>("/groups/matching");

    if (!groupsData) {
      return [];
    }

    return groupsData;
  },
);

export const getOneGroup = createAsyncThunk<IGroup, string>(
  "groups/getOneGroup",
  async (id) => {
    const { data: group } = await axiosApi.get<IGroup>(`/groups/group/${id}`);
    return group;
  },
);

export const fetchCourseGroups = createAsyncThunk<IGroup[], string>(
  "groups/fetchCourseGroups",
  async (courseId) => {
    const { data: groupsData } = await axiosApi.get<IGroup[]>(
      "/groups/" + courseId,
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

export const editGroup = createAsyncThunk<
  void,
  UpdateGroupArg,
  { rejectValue: ValidationError }
>("groups/editGroup", async ({ id, group }, { rejectWithValue }) => {
  try {
    await axiosApi.put(`/groups/${id}`, group);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const updateSubscribe = createAsyncThunk<
  void,
  { id: string; clientId: string; newSubscribeEnd: Date },
  { rejectValue: GlobalError }
>(
  "groups/updateSubscribe",
  async ({ id, clientId, newSubscribeEnd }, { rejectWithValue }) => {
    try {
      await axiosApi.patch(`/groups/update_subscribe/${id}`, {
        clientId,
        newSubscribeEnd,
      });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const removeClient = createAsyncThunk<
  void,
  { id: string; clientId: string },
  { rejectValue: GlobalError }
>("groups/removeClient", async ({ id, clientId }, { rejectWithValue }) => {
  try {
    await axiosApi.patch(`/groups/remove/${id}`, { clientId });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const freezeClient = createAsyncThunk<
  void,
  { id: string; clientId: string },
  { rejectValue: GlobalError }
>("groups/frozenClient", async ({ id, clientId }, { rejectWithValue }) => {
  try {
    await axiosApi.patch(`/groups/frozen/${id}`, { clientId });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const activateClient = createAsyncThunk<
  void,
  { id: string; clientId: string },
  { rejectValue: GlobalError }
>("groups/activateClient", async ({ id, clientId }, { rejectWithValue }) => {
  try {
    await axiosApi.patch(`/groups/active/${id}`, { clientId });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
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
