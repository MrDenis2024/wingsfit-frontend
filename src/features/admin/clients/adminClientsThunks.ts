import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi.ts";
import {ClientStats} from "../../../types/clientTypes.ts";

export const fetchAdminClients = createAsyncThunk<ClientStats>(
  'adminClients/fetchAdminClients',
  async () => {
    const {data: clients} = await axiosApi.get<ClientStats>('/admins/clients-stats');
    return clients;
  }
);