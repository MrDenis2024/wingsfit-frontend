import React from "react";
import Grid from "@mui/material/Grid2";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import TimeZone from "../../../UI/TimeZone/TimeZone.tsx";
import { UserInfoMutation } from "../../../types/userTypes.ts";

interface Props {
  personalInfo: UserInfoMutation;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTimezoneChange: (timezoneValue: string, timezoneLabel: string) => void;
}

const EditUser: React.FC<Props> = ({
  personalInfo,
  inputChangeHandler,
  onTimezoneChange,
}) => {
  return (
    <>
      <Grid>
        <Typography variant="h6">Change Personal Info</Typography>
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="First Name"
          name="firstName"
          onChange={inputChangeHandler}
          value={personalInfo.firstName}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="Last Name"
          name="lastName"
          onChange={inputChangeHandler}
          value={personalInfo.lastName}
        />
      </Grid>
      <Grid>
        <TextField
          type="tel"
          label="Phone number"
          name="phoneNumber"
          onChange={inputChangeHandler}
          value={personalInfo.phoneNumber}
        />
      </Grid>
      <Grid>
        <TextField
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          onChange={inputChangeHandler}
          value={personalInfo.dateOfBirth}
        />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        <Typography variant="subtitle1">Select Gender:</Typography>
        <RadioGroup
          value={personalInfo.gender}
          name="gender"
          onChange={inputChangeHandler}
          sx={{ mx: 4, flexDirection: "row", justifyContent: "start" }}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="another" control={<Radio />} label="Other" />
        </RadioGroup>
      </Grid>
      <Grid>
        <TimeZone
          name={"timeZone"}
          changeTimezone={onTimezoneChange}
          value={personalInfo.timeZone}
        />
      </Grid>
    </>
  );
};

export default EditUser;
