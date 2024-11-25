import {createSlice} from "@reduxjs/toolkit";

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

    },
    selectors:{
        selectError:(state) => state.error,
    }
})

export const reviewReducer = reviewSlice.reducer;

export const {
    selectError,
} = reviewSlice.selectors;