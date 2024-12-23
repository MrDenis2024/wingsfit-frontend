import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Paper, Typography } from "@mui/material";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import CourseTypeSelector from "../../../UI/CourseTypesSelector/CourseTypesSelector.tsx";
import CustomButton from "./CustomBottom/CustomBottom.tsx";
import CustomInput from "./CustomInput/CustomInput.tsx";

interface Props {
  initialState: TrainerProfileMutation;
  onSubmit: (trainerData: TrainerProfileMutation) => void;
  prevStep: () => void;
  updatePersonalInfo: (
    personal: UserInfoMutation | null,
    optional: TrainerProfileMutation | null,
    client: ClientProfileMutation | null,
  ) => void;
}

const TrainerRegisterForm: React.FC<Props> = ({
  onSubmit,
  initialState,
  prevStep,
  updatePersonalInfo,
}) => {
  const courseTypes = useAppSelector(selectCourseTypes);
  const [profileData, setProfileData] =
    useState<TrainerProfileMutation>(initialState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeCourseTypes = (courseTypes: string[]) => {
    setProfileData((prevState) => ({
      ...prevState,
      courseTypes,
    }));
  };

  const removeCourseType = (courseType: string) => {
    setProfileData((prevState) => ({
      ...prevState,
      courseTypes: prevState.courseTypes.filter((type) => type !== courseType),
    }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(profileData);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "rgba(51, 51, 51, 0.6)",
        borderRadius: "15px",
        maxWidth: "400px",
        width: "100%",
        padding: {
          xs: "5px",
          sm: "20px",
        },
        marginLeft: {
          xs: "unset",
          md: "0 auto",
        },
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        component={"form"}
        sx={{
          my: 3,
          mx: 1,
          color: "white",
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
            Заполните профильную информацию
          </Typography>
        </Grid>
        <Grid>
          <CustomInput
            label="Описание"
            multiline
            minRows={2}
            onChange={inputChangeHandler}
            value={profileData.description}
            name="description"
            type="text"
            placeholder="Опишите себя"
          />
        </Grid>
        <Grid>
          <CustomInput
            type="text"
            label="Специализация"
            name="specialization"
            placeholder="Укажите вашу специализацию"
            onChange={inputChangeHandler}
            value={profileData.specialization}
          />
        </Grid>
        <Grid>
          <CustomInput
            type="text"
            multiline
            minRows={2}
            label="Опыт"
            placeholder="Укажите ваш опыт"
            name="experience"
            onChange={inputChangeHandler}
            value={profileData.experience}
          />
        </Grid>
        <CourseTypeSelector
          courseTypes={courseTypes}
          onChange={onChangeCourseTypes}
          value={initialState.courseTypes}
          onRemove={removeCourseType}
          label="Типы курсов"
        />
        <Grid>
          <CustomInput
            type="text"
            label="Дни проведения занятий"
            placeholder="В какие дни будут занятия?"
            name="availableDays"
            onChange={inputChangeHandler}
            value={profileData.availableDays}
          />
        </Grid>
        <Grid container display="flex" justifyContent="center">
          <Grid>
            <CustomButton variant="outlined" onClick={prevStep} label="Назад" />
          </Grid>
          <Grid>
            <CustomButton
              variant="contained"
              onClick={() => updatePersonalInfo(null, profileData, null)}
              label="Завершить"
            />
          </Grid>
          <Grid>
            <CustomButton type="submit" variant="outlined" label="Далее" />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TrainerRegisterForm;
