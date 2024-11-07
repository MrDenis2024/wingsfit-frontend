import {createSlice} from "@reduxjs/toolkit";
import {getClientProfile} from "./clientThunk.ts";

export interface IClientProfile {
    _id: string;
    user:{
        _id: string;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
    },
    gender: string;
    dateOfBirth: string;
    subscribers: string[];
    timeZone: string;
    preferredWorkoutType: string;
    trainingLevel: string;
    physicalData: string;
}

interface ClientState{
    clientProfile: IClientProfile | null;
    errorLoading: boolean;
    oneClientLoading: boolean;
}

const initialState: ClientState = {
    clientProfile: null,
    errorLoading: false,
    oneClientLoading: false
}

export const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers:{},
    selectors:{
        selectClientProfile: (state) => state.clientProfile,
    },
    extraReducers:(builder) => {
        builder.addCase(getClientProfile.pending, (state) => {
            state.oneClientLoading = true;
        });
        builder.addCase(getClientProfile.fulfilled, (state, { payload: user }) => {
            state.oneClientLoading = false;
            state.clientProfile = user;
        });
        builder.addCase(getClientProfile.rejected, (state) => {
            state.oneClientLoading = false;
            state.errorLoading = true;
        });
    }
})

export const clientsReducer = clientSlice.reducer;

export const {selectClientProfile} = clientSlice.selectors;