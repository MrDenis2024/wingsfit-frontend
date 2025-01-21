import axios from "axios";
import { apiURL } from "./constants.ts";
import { Store } from "redux";
import { RootState } from "./app/store.ts";
import { unsetUser } from "./features/users/userSlice.ts";
import { toast } from "react-toastify";

const axiosApi = axios.create({
  baseURL: apiURL,
});

let isToastVisible = false;

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user?.token;
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  });

  axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(unsetUser());
        if (!isToastVisible) {
          toast.error("Произошла ошибка пройдите авторизацию");
          isToastVisible = true;
        }
      }
      return Promise.reject(error);
    },
  );
};

export default axiosApi;
