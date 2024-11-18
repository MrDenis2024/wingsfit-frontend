import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TimeZone from "../../../UI/TimeZone/TimeZone.tsx";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";

interface Props {
  onSubmit: (personalData: UserInfoMutation) => void;
  initialState: UserInfoMutation;
  updatePersonalInfo: (
    personal: UserInfoMutation | null,
    optional: TrainerProfileMutation | null,
    client: ClientProfileMutation | null,
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
      timeZone: { value: timezoneValue, label: timezoneLabel },
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
          type="tel"
          label="Phone number"
          name="phoneNumber"
          onChange={inputChangeHandler}
          value={personalData.phoneNumber}
        />
      </Grid>
      <Grid>
        <TextField
          slotProps={{
            input: {
              inputProps: {
                max: new Date().toISOString().split("T")[0] as string,
              },
            },
            inputLabel: {
              shrink: true,
            },
          }}
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          onChange={inputChangeHandler}
          value={personalData.dateOfBirth}
        />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        <Typography variant="subtitle1">Select Gender:</Typography>
        <RadioGroup
          value={personalData.gender}
          onChange={(e) =>
            inputChangeHandler({
              target: { name: "gender", value: e.target.value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          sx={{ mx: 4, flexDirection: "row", justifyContent: "start" }}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="another" control={<Radio />} label="Other" />
        </RadioGroup>
      </Grid>
      <Grid>
        <TimeZone
          name={"timeZone"}
          changeTimezone={changeTimezone}
          value={personalData.timeZone}
        />
      </Grid>
      <Grid container display="flex" justifyContent="space-between">
        <Grid>
          <Button disabled variant={"outlined"}>
            Back
          </Button>
        </Grid>
        <Grid>
          <Button
            disabled={
              personalData.firstName === "" ||
              personalData.lastName === "" ||
              personalData.timeZone.label === ""
            }
            variant="contained"
            onClick={() => updatePersonalInfo(personalData, null, null)}
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
