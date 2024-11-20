import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError } from "../../types/userTypes.ts";
import { RootState } from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { GroupMutation } from "../../types/groupTypes.ts";

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
