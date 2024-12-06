import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {
  FullTrainerProfileMutation,
  ITrainer,
  Review,
} from "../../types/trainerTypes.ts";
import { GlobalError } from "../../types/userTypes.ts";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const getTrainers = createAsyncThunk<ITrainer[]>(
  "trainers/fetchAll",
  async () => {
    const { data: trainers } = await axiosApi.get<ITrainer[]>(`/trainers/`);
    if (!trainers) {
      return [];
    }
    return trainers;
  },
);

export const getTrainerProfile = createAsyncThunk<
  { isUserProfile: boolean; trainer: ITrainer },
  string,
  { state: RootState; rejectValue: GlobalError }
>("trainers/profile", async (id, { getState, rejectWithValue }) => {
  const user = getState().users.user?._id;
  try {
    const { data: trainer } = await axiosApi.get<ITrainer>(`/trainers/${id}`);
    if (user === id) {
      return { isUserProfile: true, trainer: trainer };
    } else {
      return { isUserProfile: false, trainer: trainer };
    }
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response &&
      e.response.status === 404 &&
      user === id
    ) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
export const createTrainerProfile = createAsyncThunk<
  ITrainer,
  FullTrainerProfileMutation
>("trainers/createTrainerProfile", async (trainerProfileMutation) => {
  console.log(trainerProfileMutation);
  const { data: trainerProfile } = await axiosApi.post(
    "/trainers",
    trainerProfileMutation,
  );

  return trainerProfile;
});

export const getTrainersReview = createAsyncThunk<Review[], string>(
  "trainers/getReview",
  async (trainerId) => {
    const { data: review } = await axiosApi.get<Review[]>(
      `/review/${trainerId}`,
    );
    return review;
  },
);

export const fetchUpdateAvatarTrainer = createAsyncThunk<
  ITrainer,
  File | null,
  { rejectValue: GlobalError }
>("users/fetchUpdateAvatarClient", async (avatar, { rejectWithValue }) => {
  const formData = new FormData();
  if (avatar) {
    formData.append("avatar", avatar);
  }

  try {
    const response = await axiosApi.patch<ITrainer>("/users/avatar", formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const createCertificate = createAsyncThunk<
  ITrainer,
  { title: string; image: File }[]
>(
  "trainers/certificates/createCertificateTrainerProfile",
  async (certificates, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      certificates.forEach((certificate) => {
        formData.append("title", certificate.title);
        formData.append("certificate", certificate.image);
      });

      const { data: trainerProfile } = await axiosApi.patch(
        "trainers/certificates",
        formData,
      );
      return trainerProfile;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      return rejectWithValue(e);
    }
  },
);

export const deleteCertificate = createAsyncThunk<ITrainer, string>(
  "trainers/certificates/fetchDelete",
  async (_id, { rejectWithValue }) => {
    try {
      const { data: certificate } = await axiosApi.delete<ITrainer>(
        `/trainers/certificates/${_id}`,
      );
      return certificate;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
