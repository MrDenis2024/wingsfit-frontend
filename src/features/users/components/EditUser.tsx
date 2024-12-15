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
        <Typography variant="h6">Измените ваши персональные данные</Typography>
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="Имя"
          name="firstName"
          onChange={inputChangeHandler}
          value={personalInfo.firstName}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="Фамилия"
          name="lastName"
          onChange={inputChangeHandler}
          value={personalInfo.lastName}
        />
      </Grid>
      <Grid>
        <TextField
          type="tel"
          label="Номер телефона"
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
          label="Дата рождения"
          name="dateOfBirth"
          onChange={inputChangeHandler}
          value={personalInfo.dateOfBirth}
        />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        <Typography variant="subtitle1">Пол:</Typography>
        <RadioGroup
          value={personalInfo.gender}
          name="gender"
          onChange={inputChangeHandler}
          sx={{ mx: 4, flexDirection: "row", justifyContent: "start" }}
        >
          <FormControlLabel value="male" control={<Radio />} label="Мужчина" />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Женщина"
          />
          <FormControlLabel value="other" control={<Radio />} label="Другой" />
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
