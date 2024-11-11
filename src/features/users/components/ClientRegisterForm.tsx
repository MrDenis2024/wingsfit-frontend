import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";

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
          label="Preferred Workout Type"
          name="preferredWorkoutType"
          onChange={inputChangeHandler}
          value={profileData.preferredWorkoutType}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Training Level"
          name="trainingLevel"
          onChange={inputChangeHandler}
          value={profileData.trainingLevel}
        />
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
