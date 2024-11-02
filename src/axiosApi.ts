import axios from "axios";
import { apiURL } from "./constants.ts";
import { Store } from "redux";
import { RootState } from "./app/store.ts";

const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user.user?.token;
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  });
};

export default axiosApi;
