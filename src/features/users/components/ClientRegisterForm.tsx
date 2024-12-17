import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import CourseTypeSelector from "../../../UI/CourseTypesSelector/CourseTypesSelector.tsx";
import CustomButton from "./CustomBottom/CustomBottom.tsx";
import CustomInput from "./CustomInput/CustomInput.tsx";

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
      preferredWorkoutType: prevState.preferredWorkoutType.filter(
        (type) => type !== courseType,
      ),
    }));
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      component={"form"}
      sx={{
        mt: {
          xs: "30px",
          sm: "250px",
        },
        mb: 1,
        mx: 1,
        maxWidth: "400px",
        width: "100%",
        marginLeft: "auto",
        color: "white",
      }}
      onSubmit={submitHandler}
    >
      <Grid>
        <Typography variant="h6" sx={{ color: "white" }}>
          Заполните профильную информацию
        </Typography>
      </Grid>
      <Grid>
        <CourseTypeSelector
          courseTypes={courseTypes}
          onChange={onChangeWorkoutType}
          value={initialState.preferredWorkoutType}
          onRemove={removeWorkoutType}
          label="Предпочитаемые типы тренировок"
        />
      </Grid>
      <Grid>
        <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
          Уровень тренировок:{" "}
        </Typography>
        <RadioGroup
          name="trainingLevel"
          value={profileData.trainingLevel}
          onChange={inputChangeHandler}
          sx={{
            mx: 4,
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <FormControlLabel
            value="junior"
            control={<Radio sx={{ fontSize: "18px", color: "white" }} />}
            label="Начальный"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                fontWeight: "bold",
              },
            }}
          />
          <FormControlLabel
            value="middle"
            control={<Radio sx={{ fontSize: "18px", color: "white" }} />}
            label="Средний"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                fontWeight: "bold",
              },
            }}
          />
          <FormControlLabel
            value="advanced"
            control={<Radio sx={{ fontSize: "18px", color: "white" }} />}
            label="Продвинутый"
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
        <CustomInput
          type="text"
          multiline
          minRows={2}
          label="Физические данные"
          name="physicalData"
          onChange={inputChangeHandler}
          value={profileData.physicalData}
        />
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Grid>
          <CustomButton variant="outlined" onClick={prevStep} label="Назад" />
        </Grid>
        <Grid>
          <CustomButton
            variant="contained"
            onClick={() => updatePersonalInfo(null, null, profileData)}
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

export default ClientRegisterForm;
