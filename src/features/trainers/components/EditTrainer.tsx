import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import { editTrainer, getTrainerProfile } from "../trainersThunks.ts";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectEditLoading,
  selectTrainerProfile,
  selectTrainerProfileLoading,
} from "../trainersSlice.ts";
import Grid from "@mui/material/Grid2";
import EditTrainerForm from "./EditTrainerForm.tsx";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import {
  FullTrainerProfileMutation,
  TrainerProfileMutation,
} from "../../../types/trainerTypes.ts";
import { toast } from "react-toastify";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";

const EditTrainer = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trainerProfile = useAppSelector(selectTrainerProfile);
  const isLoading = useAppSelector(selectTrainerProfileLoading);
  const editLoading = useAppSelector(selectEditLoading);

  useEffect(() => {
    dispatch(getTrainerProfile(id));
  }, [dispatch, id]);

  const updateTrainerProfile = async (
    personalInfo: UserInfoMutation,
    optionalInfo: TrainerProfileMutation,
  ) => {
    try {
      const trainerProfile: FullTrainerProfileMutation = {
        ...personalInfo,
        ...optionalInfo,
      };

      await dispatch(editTrainer(trainerProfile)).unwrap();
      navigate(`/trainers/${id}`);
      toast.success("Данный успешно обновлены");
    } catch {
      toast.error("Произошла ошибка обновления данных");
    }
  };

  return (
    <Grid>
      {isLoading && <LoadingIndicator />}
      {trainerProfile && (
        <EditTrainerForm
          editLoading={editLoading}
          onSubmit={updateTrainerProfile}
          existingProfile={trainerProfile}
        />
      )}
    </Grid>
  );
};

export default EditTrainer;
