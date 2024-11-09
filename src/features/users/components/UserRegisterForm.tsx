import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import TimeZone from "../../../UI/TimeZone/TimeZone.tsx";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";

interface Props {
  onSubmit: (personalData: UserInfoMutation) => void;
  initialState: UserInfoMutation;
  updatePersonalInfo: (
    personal: UserInfoMutation | null,
    optional: TrainerProfileMutation | null,
  ) => void;
}

const UserRegisterForm: React.FC<Props> = ({
  onSubmit,
  initialState,
  updatePersonalInfo,
}) => {
  const [personalData, setPersonalData] =
    useState<UserInfoMutation>(initialState);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeTimezone = (timezoneValue: string, timezoneLabel: string) => {
    setPersonalData((prevState) => ({
      ...prevState,
      timezone: { value: timezoneValue, label: timezoneLabel },
    }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setPersonalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(personalData);
  };

  return (
    <Grid
      container
      spacing={2}
      component={"form"}
      direction="column"
      sx={{ my: 3 }}
      onSubmit={submitHandler}
    >
      <Grid>
        <Typography variant="h6">Fill Personal Info</Typography>
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="First Name"
          name="firstName"
          onChange={inputChangeHandler}
          value={personalData.firstName}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="Last Name"
          name="lastName"
          onChange={inputChangeHandler}
          value={personalData.lastName}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Phone number"
          name="phoneNumber"
          onChange={inputChangeHandler}
          value={personalData.phoneNumber}
        />
      </Grid>
      <Grid>
        <FileInput
          onChange={fileInputChangeHandler}
          name="avatar"
          label="Upload Avatar"
        />
      </Grid>
      <Grid>
        <TimeZone
          name={"timeZone"}
          changeTimezone={changeTimezone}
          value={personalData.timezone}
        />
      </Grid>
      <Grid container display="flex" justifyContent="space-between">
        <Grid>
          <Button disabled>Back</Button>
        </Grid>
        <Grid>
          <Button
            disabled={
              personalData.firstName === "" ||
              personalData.firstName === "" ||
              personalData.timezone.label === ""
            }
            onClick={() => updatePersonalInfo(personalData, null)}
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

export default UserRegisterForm;
