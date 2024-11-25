import {createAsyncThunk} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi.ts";

export const createReview = createAsyncThunk<void, { reviewText: string; reviewValue: number, id: string }>(
    "reviews/createReview",
    async (reviewData, { rejectWithValue }) => {
        try {
            await axiosApi.post(`/review/${reviewData.id}` , reviewData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);
