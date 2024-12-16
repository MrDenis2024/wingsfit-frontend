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
      sx={{ my: 3, mx: 1 }}
      onSubmit={submitHandler}
    >
      <Grid>
        <Typography variant="h6">Заполните персональную информацию </Typography>
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="Имя"
          name="firstName"
          onChange={inputChangeHandler}
          value={personalData.firstName}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          required
          label="Фамилия"
          name="lastName"
          onChange={inputChangeHandler}
          value={personalData.lastName}
        />
      </Grid>
      <Grid>
        <TextField
          type="tel"
          label="Номер телефона"
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
          label="Дата рождения"
          name="dateOfBirth"
          onChange={inputChangeHandler}
          value={personalData.dateOfBirth}
        />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        <Typography variant="subtitle1">Пол:</Typography>
        <RadioGroup
          value={personalData.gender}
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
          <FormControlLabel value="other" control={<Radio />} label="Другое" />
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
            Назад
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
            Завершить
          </Button>
        </Grid>
        <Grid>
          <Button type={"submit"} variant="outlined">
            Далее
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserRegisterForm;
