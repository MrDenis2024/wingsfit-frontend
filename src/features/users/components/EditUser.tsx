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
import PhoneInput from "react-phone-number-input";

interface Props {
  personalInfo: UserInfoMutation;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTimezoneChange: (timezoneValue: string, timezoneLabel: string) => void;
  phoneChangeHandler: (value: string | undefined) => void;
  phoneError: boolean;
}

const EditUser: React.FC<Props> = ({
  personalInfo,
  inputChangeHandler,
  onTimezoneChange,
  phoneChangeHandler,
  phoneError,
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
      <Grid sx={{ position: "relative" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "14px",
            color: "#666666",
            fontWeight: 400,
            lineHeight: 1.5,
            paddingLeft: "14px",
          }}
        >
          Номер телефона
        </Typography>
        <PhoneInput
          name="phoneNumber"
          label="Номер телефона"
          defaultCountry="KG"
          onChange={phoneChangeHandler}
          international
          value={personalInfo.phoneNumber}
          style={{
            width: "100%",
            padding: "2px",
            paddingLeft: "14px",
            border: phoneError ? "1px solid red" : "1px solid #ccc",
            borderRadius: "8px",
            fontSize: {
              xs: "12px",
            },
          }}
        />
        {phoneError && (
          <Typography
            color="error"
            variant="body2"
            sx={{
              width: "100%",
              position: "absolute",
              top: 72,
              left: 0,
              backgroundColor: "white",
              borderRadius: "5px",
              p: "5px",
              fontSize: "1rem",
              "@media (max-width: 600px)": {
                fontSize: "12px",
                top: 60,
                left: 0,
              },
              "@media (max-width: 350px)": {
                fontSize: "12px",
                top: 60,
                left: 0,
              },
            }}
          >
            Некорректный номер телефона.
          </Typography>
        )}
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
