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

  useEffect(() => {
    dispatch(fetchCourseTypes());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonalInfo((prevState) => ({
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
        inputChangeHandler={inputChangeHandler}
      />
      <Grid>
        <Typography variant="h6">Fill optional Info</Typography>
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Description"
          name="description"
          onChange={inputChangeHandler}
          value={optionalInfo.description}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Specialization"
          name="specialization"
          onChange={inputChangeHandler}
          value={optionalInfo.specialization}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Experience"
          name="experience"
          onChange={inputChangeHandler}
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
          label="Available Days"
          name="availableDays"
          onChange={inputChangeHandler}
          value={optionalInfo.availableDays}
        />
      </Grid>
      <Grid>
        <LoadingButton type={"submit"} variant="outlined" loading={editLoading}>
          Save
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default EditTrainerForm;
