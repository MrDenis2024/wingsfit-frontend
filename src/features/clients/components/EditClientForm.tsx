import React, { useEffect, useState } from "react";
import { ClientProfileMutation, IClient } from "../../../types/clientTypes.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import EditUser from "../../users/components/EditUser.tsx";
import Grid from "@mui/material/Grid2";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CourseTypeSelector from "../../../UI/CourseTypesSelector/CourseTypesSelector.tsx";
import LoadingButton from "@mui/lab/LoadingButton";
import { fetchCourseTypes } from "../../CourseTypes/CourseTypesThunks.ts";

interface Props {
  existingProfile: IClient;
  updateClientProfile: (
    personalInfo: UserInfoMutation,
    optionalInfo: ClientProfileMutation,
  ) => void;
  editLoading: boolean;
}

const EditClientForm: React.FC<Props> = ({
  existingProfile,
  updateClientProfile,
  editLoading,
}) => {
  const dispatch = useAppDispatch();
  const courseTypes = useAppSelector(selectCourseTypes);
  const [clientPersonalInfo, setClientPersonalInfo] =
    useState<UserInfoMutation>({
      firstName: existingProfile.user.firstName,
      lastName: existingProfile.user.lastName,
      timeZone: existingProfile.user.timeZone,
      phoneNumber: existingProfile.user.phoneNumber,
      dateOfBirth: new Date(existingProfile.user.dateOfBirth)
        .toISOString()
        .split("T")[0],
      gender: existingProfile.user.gender,
    });
  const [optionalInfo, setOptionalInfo] = useState<ClientProfileMutation>({
    preferredWorkoutType: existingProfile.preferredWorkoutType,
    trainingLevel: existingProfile.trainingLevel,
    physicalData: existingProfile.physicalData,
  });

  useEffect(() => {
    dispatch(fetchCourseTypes());
  }, [dispatch]);

  const inputChangeHandlerClientPersonal = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setClientPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputChangeHandlerClientOptional = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setOptionalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeTimezone = (timezoneValue: string, timezoneLabel: string) => {
    setClientPersonalInfo((prevState) => ({
      ...prevState,
      timeZone: { value: timezoneValue, label: timezoneLabel },
    }));
  };

  const onChangeWorkoutType = (preferredWorkoutType: string[]) => {
    setOptionalInfo((prevState) => ({
      ...prevState,
      preferredWorkoutType,
    }));
  };

  const removeWorkoutType = (courseType: string) => {
    setOptionalInfo((prevState) => ({
      ...prevState,
      preferredWorkoutType: prevState.preferredWorkoutType.filter(
        (type) => type !== courseType,
      ),
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateClientProfile(clientPersonalInfo, optionalInfo);
  };

  return (
    <Grid
      container
      spacing={2}
      component={"form"}
      direction="column"
      sx={{ my: 3 }}
      onSubmit={onFormSubmit}
    >
      <EditUser
        personalInfo={clientPersonalInfo}
        onTimezoneChange={changeTimezone}
        inputChangeHandler={inputChangeHandlerClientPersonal}
      />
      <Grid>
        <Typography variant="h6">Измените профильные данные</Typography>
      </Grid>
      <Grid>
        <CourseTypeSelector
          courseTypes={courseTypes}
          onChange={onChangeWorkoutType}
          value={optionalInfo.preferredWorkoutType}
          onRemove={removeWorkoutType}
          label="Предпочтения"
        />
      </Grid>
      <Grid>
        <Typography variant="subtitle1">Уровень тренировок: </Typography>
        <RadioGroup
          name="trainingLevel"
          value={optionalInfo.trainingLevel}
          onChange={inputChangeHandlerClientOptional}
          sx={{ mx: 4, flexDirection: "row", justifyContent: "start" }}
        >
          <FormControlLabel
            value="junior"
            control={<Radio />}
            label="Начальный"
          />
          <FormControlLabel
            value="middle"
            control={<Radio />}
            label="Средний"
          />
          <FormControlLabel
            value="advanced"
            control={<Radio />}
            label="Продвинутый"
          />
        </RadioGroup>
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Физические данные"
          name="physicalData"
          onChange={inputChangeHandlerClientOptional}
          value={optionalInfo.physicalData}
        />
      </Grid>
      <Grid>
        <LoadingButton type={"submit"} variant="outlined" loading={editLoading}>
          Сохранить
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default EditClientForm;
