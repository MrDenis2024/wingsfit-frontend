import {createAsyncThunk} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import axiosApi from "../../axiosApi.ts";

export const createReview = createAsyncThunk<void, { comment: string; rating: number, trainerId: string }>(
    "reviews/createReview",
    async (reviewData, { rejectWithValue }) => {
        try {
            await axiosApi.post(`/review` , reviewData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 403) {
                console.log("Axios Error:", e.response.data);
                return rejectWithValue(e.response.data.error);
            }
            throw e;
        }
    }
);
