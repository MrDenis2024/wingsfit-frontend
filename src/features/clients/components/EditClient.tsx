import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { editClient, getClientProfile } from "../clientThunk.ts";
import {
  selectClientProfile,
  selectClientProfileLoading,
  selectEditClientLoading,
} from "../clientSlice.ts";
import Grid from "@mui/material/Grid2";
import EditClientForm from "./EditClientForm.tsx";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import {
  ClientProfileMutation,
  FullClientProfileMutation,
} from "../../../types/clientTypes.ts";
import { toast } from "react-toastify";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";

const EditClient = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const clientProfile = useAppSelector(selectClientProfile);
  const isLoading = useAppSelector(selectClientProfileLoading);
  const editLoading = useAppSelector(selectEditClientLoading);

  useEffect(() => {
    dispatch(getClientProfile(id));
  }, [dispatch, id]);

  const updateClientProfile = async (
    personalInfo: UserInfoMutation,
    optionalInfo: ClientProfileMutation,
  ) => {
    try {
      const clientProfile: FullClientProfileMutation = {
        ...personalInfo,
        ...optionalInfo,
      };

      await dispatch(editClient(clientProfile)).unwrap();
      navigate(`/clients/${id}`);
    } catch {
      toast.error("Произошла ошибка обновления данных");
    }
  };

  return (
    <Grid>
      {isLoading && <LoadingIndicator />}
      {clientProfile && (
        <EditClientForm
          editLoading={editLoading}
          updateClientProfile={updateClientProfile}
          existingProfile={clientProfile}
        />
      )}
    </Grid>
  );
};

export default EditClient;
