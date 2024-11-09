import { useState } from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserRegisterForm from "./components/UserRegisterForm.tsx";
import TrainerRegisterForm from "./components/TrainerRegisterForm.tsx";
import { UserInfoMutation } from "../../types/userTypes.ts";
import { TrainerProfileMutation } from "../../types/trainerTypes.ts";
import RegisterPreview from "./components/RegisterPreview.tsx";

const OnBoardingProfile = () => {
  const stepLabels = ["Fill personal info", "Fill optional info", "Preview"];
  const [activeStep, setActiveStep] = useState<number>(0);
  const [requiredInfo, setRequiredInfo] = useState<UserInfoMutation>({
    firstName: "",
    lastName: "",
    timezone: { value: "", label: "" },
    phoneNumber: "",
    avatar: null,
  });
  const [optionalInfo, setOptionalInfo] = useState<TrainerProfileMutation>({
    description: "",
    specialization: "",
    experience: "",
    courseTypes: [""],
    certificates: "",
    availableDays: "",
  });
  const onHandleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };
  const onHandlePrev = () => {
    setActiveStep((prevState) => prevState - 1);
  };
  const onUserSubmit = (userData: UserInfoMutation) => {
    setRequiredInfo(userData);
    onHandleNext();
  };
  const trainerProfileSubmit = (trainerData: TrainerProfileMutation) => {
    setOptionalInfo(trainerData);
    onHandleNext();
  };
  const updatePersonalInfo = (
    personalData: UserInfoMutation | null,
    optionalData: TrainerProfileMutation | null,
  ) => {
    if (personalData) {
      onUserSubmit(personalData);
      setActiveStep(2);
      console.log(personalData, optionalInfo);
    }
    if (optionalData) {
      trainerProfileSubmit(optionalData);
      console.log(requiredInfo, optionalData);
    }
  };

  return (
    <Grid>
      {activeStep === 0 && (
        <UserRegisterForm
          initialState={requiredInfo}
          onSubmit={onUserSubmit}
          updatePersonalInfo={updatePersonalInfo}
        />
      )}
      {activeStep === 1 && (
        <TrainerRegisterForm
          initialState={optionalInfo}
          onSubmit={trainerProfileSubmit}
          prevStep={onHandlePrev}
          updatePersonalInfo={updatePersonalInfo}
        />
      )}
      {activeStep === 2 && (
        <>
          <RegisterPreview
            requiredData={requiredInfo}
            optionalData={optionalInfo}
          />
          <Grid textAlign="center">
            <Button variant={"contained"} sx={{ my: 3 }}>
              Confirm
            </Button>
          </Grid>
        </>
      )}
      <Stepper activeStep={activeStep}>
        {stepLabels.map((label, index) => {
          return (
            <Step key={label} completed={activeStep > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Grid>
  );
};

export default OnBoardingProfile;
