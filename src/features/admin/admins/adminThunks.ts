import {createAsyncThunk} from "@reduxjs/toolkit";
import {AdminMutation} from "../../../types/adminTypes.ts";
import {isAxiosError} from "axios";
import {GlobalError} from "../../../types/userTypes.ts";
import axiosApi from "../../../axiosApi.ts";

export const createAdmin = createAsyncThunk<void, AdminMutation, {rejectValue: GlobalError}>('admins/create', async (adminMutation, {rejectWithValue}) => {
    try {
       await axiosApi.post('/admins', adminMutation);
    } catch (error) {
        if( isAxiosError(error) && error.response && error.response.status === 400) {
            return rejectWithValue(error.response.data);
        }

        throw error;
    }
});