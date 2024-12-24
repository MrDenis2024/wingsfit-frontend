import React, { useEffect, useState } from "react";
import {
  ITrainer,
  TrainerProfileMutation,
} from "../../../types/trainerTypes.ts";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import Grid from "@mui/material/Grid2";
import { TextField, Typography } from "@mui/material";
import CourseTypeSelector from "../../../UI/CourseTypesSelector/CourseTypesSelector.tsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import LoadingButton from "@mui/lab/LoadingButton";
import { fetchCourseTypes } from "../../CourseTypes/CourseTypesThunks.ts";
import EditUser from "../../users/components/EditUser.tsx";
import {isValidPhoneNumber} from "react-phone-number-input/min";

interface Props {
  existingProfile: ITrainer;
  onSubmit: (
    personalInfo: UserInfoMutation,
    optionalInfo: TrainerProfileMutation,
  ) => void;
  editLoading: boolean;
}

const EditTrainerForm: React.FC<Props> = ({
  existingProfile,
  onSubmit,
  editLoading,
}) => {
  const dispatch = useAppDispatch();
  const courseTypes = useAppSelector(selectCourseTypes);
  const [personalInfo, setPersonalInfo] = useState<UserInfoMutation>({
    firstName: existingProfile.user.firstName,
    lastName: existingProfile.user.lastName,
    timeZone: existingProfile.user.timeZone,
    phoneNumber: existingProfile.user.phoneNumber,
    dateOfBirth: new Date(existingProfile.user.dateOfBirth)
      .toISOString()
      .split("T")[0],
    gender: existingProfile.user.gender,
  });
  const [optionalInfo, setOptionalInfo] = useState<TrainerProfileMutation>({
    description: existingProfile.description ? existingProfile.description : "",
    specialization: existingProfile.specialization,
    experience: existingProfile.experience,
    courseTypes: existingProfile.courseTypes,
    availableDays: existingProfile.availableDays
      ? existingProfile.availableDays
      : "",
  });
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    dispatch(fetchCourseTypes());
  }, [dispatch]);

  const inputChangeHandlerPersonal = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setPersonalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputChangeHandlerOptional = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setOptionalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeTimezone = (timezoneValue: string, timezoneLabel: string) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      timeZone: { value: timezoneValue, label: timezoneLabel },
    }));
  };

  const onChangeCourseTypes = (courseTypes: string[]) => {
    setOptionalInfo((prevState) => ({
      ...prevState,
      courseTypes,
    }));
  };

  const removeCourseType = (courseType: string) => {
    setOptionalInfo((prevState) => ({
      ...prevState,
      courseTypes: prevState.courseTypes.filter((type) => type !== courseType),
    }));
  };

  const phoneChangeHandler = (value: string | undefined) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      phoneNumber: value || "",
    }));

    if (value && !isValidPhoneNumber(value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(personalInfo, optionalInfo);
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
        personalInfo={personalInfo}
        onTimezoneChange={changeTimezone}
        inputChangeHandler={inputChangeHandlerPersonal}
        phoneChangeHandler={phoneChangeHandler}
        phoneError={phoneError}
      />
      <Grid>
        <Typography variant="h6">Измените профильную информацию</Typography>
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Описание"
          name="description"
          onChange={inputChangeHandlerOptional}
          value={optionalInfo.description}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Специализация"
          name="specialization"
          onChange={inputChangeHandlerOptional}
          value={optionalInfo.specialization}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Опыт"
          name="experience"
          onChange={inputChangeHandlerOptional}
          value={optionalInfo.experience}
        />
      </Grid>
      <CourseTypeSelector
        courseTypes={courseTypes}
        onChange={onChangeCourseTypes}
        value={optionalInfo.courseTypes}
        onRemove={removeCourseType}
        label="Course types"
      />
      <Grid>
        <TextField
          type="text"
          label="Дни проведения занятий"
          name="availableDays"
          onChange={inputChangeHandlerOptional}
          value={optionalInfo.availableDays}
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

export default EditTrainerForm;
