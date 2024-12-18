import React, { useState } from "react";
import "./../../../App.css";
import {
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
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CustomButton from "./CustomBottom/CustomBottom.tsx";
import CustomInput from "./CustomInput/CustomInput.tsx";
import { toast } from "react-toastify";

interface Props {
  onSubmit: (personalData: UserInfoMutation) => void;
  initialState: UserInfoMutation;
  updatePersonalInfo: (
    personal: UserInfoMutation | null,
    optional: TrainerProfileMutation | null,
    client: ClientProfileMutation | null,
  ) => void;
  role: "trainer" | "client";
}

const UserRegisterForm: React.FC<Props> = ({
  onSubmit,
  initialState,
  updatePersonalInfo,
  role,
}) => {
  const [personalData, setPersonalData] =
    useState<UserInfoMutation>(initialState);
  const [phoneError, setPhoneError] = useState(false);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersonalData((prevState) => ({ ...prevState, [name]: value }));
  };

  const changeTimezone = (timezoneValue: string, timezoneLabel: string) => {
    setPersonalData((prevState) => ({
      ...prevState,
      timeZone: { value: timezoneValue, label: timezoneLabel },
    }));
  };

  const phoneChangeHandler = (value: string | undefined) => {
    setPersonalData((prevState) => ({ ...prevState, phoneNumber: value }));
    if (value && !isValidPhoneNumber(value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (personalData.phoneNumber && phoneError) {
      toast.error("Введите корректный номер телефона");
      return;
    }
    onSubmit(personalData);
  };

  return (
    <Grid
      container
      spacing={2}
      component={"form"}
      direction="column"
      sx={{
        mt: {
          xs: "30px",
          sm: "150px",
        },
        mb: 1,
        mx: 1,
        maxWidth: "400px",
        width: "100%",
        marginLeft: {
          xs: "unset",
          md: role === "trainer" ? "0" : "auto",
        },
        marginRight: {
          xs: "unset",
          md: role === "client" ? "0" : "auto",
        },
      }}
      onSubmit={submitHandler}
    >
      <Grid>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontSize: { xs: "16px", sm: "24px", md: "28px" },
            fontWeight: "bold",
          }}
        >
          Заполните персональную информацию
        </Typography>
      </Grid>
      <Grid>
        <CustomInput
          label="Имя"
          value={personalData.firstName}
          onChange={inputChangeHandler}
          name="firstName"
          required
          type="text"
        />
      </Grid>
      <Grid>
        <CustomInput
          label="Фамилия"
          value={personalData.lastName}
          onChange={inputChangeHandler}
          name="lastName"
          required
          type="text"
        />
      </Grid>
      <Grid>
        <Typography variant="h6" sx={{ color: "white", fontSize: "16px" }}>
          Номер телефона
        </Typography>
        <PhoneInput
          value={personalData.phoneNumber}
          onChange={phoneChangeHandler}
          defaultCountry="KG"
          international
          style={{
            width: "100%",
            padding: "2px",
            border: phoneError ? "1px solid red" : "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            marginBottom: "20px",
          }}
        />
        {phoneError && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            Некорректный номер телефона.
          </Typography>
        )}
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
              sx: {
                position: "absolute",
                top: "7px",
                left: "0px",
                "@media (max-width: 350px)": {
                  top: "5px",
                  left: "0px",
                },
                "&.Mui-focused": {
                  color: "#333",
                },
              },
            },
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&.Mui-focused": {
                boxShadow: "0 0 8px rgba(0, 123, 255, 0.3)",
              },
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
              padding: {
                xs: "6px",
                sm: "12px",
              },
            },
            "& .MuiInputLabel-root": {
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-input": {
              padding: "8px",
              "@media (max-width: 350px)": {
                padding: "10px",
              },
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
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            marginRight: 2,
            color: "#f9f9f9",
          }}
        >
          Пол:
        </Typography>
        <RadioGroup
          value={personalData.gender}
          name="gender"
          onChange={inputChangeHandler}
          sx={{
            mx: 1,
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            color: "#f9f9f9",
          }}
        >
          <FormControlLabel
            value="male"
            control={<Radio sx={{ fontSize: "18px", color: "white" }} />}
            label="Мужчина"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                fontWeight: "bold",
              },
            }}
          />
          <FormControlLabel
            value="female"
            control={<Radio sx={{ fontSize: "18px", color: "white" }} />}
            label="Женщина"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                fontWeight: "bold",
              },
            }}
          />
          <FormControlLabel
            value="other"
            control={<Radio sx={{ fontSize: "18px", color: "white" }} />}
            label="Другое"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                fontWeight: "bold",
              },
            }}
          />
        </RadioGroup>
      </Grid>
      <Grid>
        <TimeZone
          name={"timeZone"}
          changeTimezone={changeTimezone}
          value={personalData.timeZone}
        />
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Grid>
          <CustomButton variant="outlined" disabled label="Назад" />
        </Grid>
        <Grid>
          <CustomButton
            disabled={
              personalData.firstName === "" ||
              personalData.lastName === "" ||
              personalData.timeZone.label === ""
            }
            variant="contained"
            onClick={() => updatePersonalInfo(personalData, null, null)}
            label="Завершить"
          />
        </Grid>
        <Grid>
          <CustomButton type="submit" variant="outlined" label="Далее" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserRegisterForm;
