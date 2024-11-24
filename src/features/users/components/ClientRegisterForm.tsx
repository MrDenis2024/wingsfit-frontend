import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectCourseTypes} from "../../CourseTypes/CourseTypesSlice.ts";
import CourseTypeSelector from "../../../UI/CourseTypesSelector/CourseTypesSelector.tsx";

interface Props {
  initialState: ClientProfileMutation;
  onSubmit: (clientData: ClientProfileMutation) => void;
  prevStep: () => void;
  updatePersonalInfo: (
    personal: UserInfoMutation | null,
    optional: TrainerProfileMutation | null,
    client: ClientProfileMutation | null,
  ) => void;
}

const ClientRegisterForm: React.FC<Props> = ({
  onSubmit,
  initialState,
  prevStep,
  updatePersonalInfo,
}) => {
  const courseTypes = useAppSelector(selectCourseTypes);
  const [profileData, setProfileData] =
    useState<ClientProfileMutation>(initialState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(profileData);
  };

  const onChangeWorkoutType = (preferredWorkoutType: string[]) => {
    setProfileData((prevState) => ({
      ...prevState,
      preferredWorkoutType,
    }));
  };

  const removeWorkoutType = (courseType: string) => {
    setProfileData((prevState) => ({
      ...prevState,
      preferredWorkoutType: prevState.preferredWorkoutType.filter((type) => type !== courseType),
    }));
  };

  const changeSelectHandler = (event: SelectChangeEvent) => {
    setProfileData((prevState) => ({
      ...prevState,
      trainingLevel: event.target.value,
    }));
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
        <CourseTypeSelector
          courseTypes={courseTypes}
          onChange={onChangeWorkoutType}
          value={initialState.preferredWorkoutType}
          onRemove={removeWorkoutType}
          label="Preffered workout Type"
        />
      </Grid>
      <Grid>
        <InputLabel id="training-level-label">Training Level</InputLabel>
        <Select
          fullWidth
          labelId="training-level-label"
          value={profileData.trainingLevel}
          onChange={changeSelectHandler}
          variant="outlined"
        >
          <MenuItem value="" disabled>Select your training level</MenuItem>
          <MenuItem value="junior">Junior</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="advanced">Advanced</MenuItem>
        </Select>
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Physical Data"
          name="physicalData"
          onChange={inputChangeHandler}
          value={profileData.physicalData}
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
            onClick={() => updatePersonalInfo(null, null, profileData)}
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

export default ClientRegisterForm;
