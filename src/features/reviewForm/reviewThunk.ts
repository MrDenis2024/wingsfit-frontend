import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosApi from "../../axiosApi.ts";

export const createReview = createAsyncThunk<
  void,
  { comment: string; rating: number; trainerId: string }
>("reviews/createReview", async (reviewData, { rejectWithValue }) => {
  try {
    await axiosApi.post(`/review`, reviewData);
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data.error);
    }
    throw e;
  }
});
