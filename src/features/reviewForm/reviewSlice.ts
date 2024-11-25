import {createSlice} from "@reduxjs/toolkit";
import {createReview} from "./reviewThunk.ts";


interface ReviewState {
    error: string | null;
    loading: boolean;
}

const initialState: ReviewState = {
    error: null,
    loading: false,
}

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReview.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
    selectors:{
        selectError:(state) => state.error,
    }
})

export const reviewReducer = reviewSlice.reducer;

export const {
    selectError,
} = reviewSlice.selectors;