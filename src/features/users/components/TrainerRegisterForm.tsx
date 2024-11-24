import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {Button, TextField, Typography} from "@mui/material";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectCourseTypes} from "../../CourseTypes/CourseTypesSlice.ts";
import CourseTypeSelector from "../../../UI/CourseTypesSelector/CourseTypesSelector.tsx";

interface Props {
  initialState: TrainerProfileMutation;
  onSubmit: (trainerData: TrainerProfileMutation) => void;
  prevStep: () => void;
  updatePersonalInfo: (
    personal: UserInfoMutation | null,
    optional: TrainerProfileMutation | null,
    client: ClientProfileMutation | null,
  ) => void;
}

const TrainerRegisterForm: React.FC<Props> = ({
  onSubmit,
  initialState,
  prevStep,
  updatePersonalInfo,
}) => {
  const courseTypes = useAppSelector(selectCourseTypes);
  const [profileData, setProfileData] =
    useState<TrainerProfileMutation>(initialState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeCourseTypes = (courseTypes: string[]) => {
    console.log(courseTypes);
    setProfileData((prevState) => ({
      ...prevState,
      courseTypes,
    }));
  };

  const removeCourseType = (courseType: string) => {
    console.log(courseType);
    setProfileData((prevState) => ({
      ...prevState,
      courseTypes: prevState.courseTypes.filter((type) => type !== courseType),
    }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(profileData);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      component={"form"}
      sx={{ my: 3 }}
      onSubmit={submitHandler}
    >
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
          value={profileData.description}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Specialization"
          name="specialization"
          onChange={inputChangeHandler}
          value={profileData.specialization}
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
          value={profileData.experience}
        />
      </Grid>
      <CourseTypeSelector
        courseTypes={courseTypes}
        onChange={onChangeCourseTypes}
        value={initialState.courseTypes}
        onRemove={removeCourseType}
      />
      <Grid>
        <TextField
          type="text"
          label="Available Days"
          name="availableDays"
          onChange={inputChangeHandler}
          value={profileData.availableDays}
        />
      </Grid>
      <Grid container display="flex" justifyContent="space-between">
        <Grid>
          <Button onClick={prevStep} variant="outlined">
            Back
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() => updatePersonalInfo(null, profileData, null)}
          >
            Finish
          </Button>
        </Grid>
        <Grid>
          <Button type={"submit"} variant="outlined">
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TrainerRegisterForm;
