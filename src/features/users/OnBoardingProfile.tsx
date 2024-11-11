import { useState } from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserRegisterForm from "./components/UserRegisterForm.tsx";
import TrainerRegisterForm from "./components/TrainerRegisterForm.tsx";
import { UserInfoMutation } from "../../types/userTypes.ts";
import { TrainerProfileMutation } from "../../types/trainerTypes.ts";
import RegisterPreview from "./components/RegisterPreview.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "./userSlice.ts";
import { ClientProfileMutation } from "../../types/clientTypes.ts";
import ClientRegisterForm from "./components/ClientRegisterForm.tsx";

const OnBoardingProfile = () => {
  const user = useAppSelector(selectUser);
  const stepLabels = ["Fill personal info", "Fill optional info", "Preview"];
  const [activeStep, setActiveStep] = useState<number>(0);
  const [requiredInfo, setRequiredInfo] = useState<UserInfoMutation>({
    firstName: "",
    lastName: "",
    timezone: { value: "", label: "" },
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });
  const [optionalInfo, setOptionalInfo] = useState<TrainerProfileMutation>({
    description: "",
    specialization: "",
    experience: "",
    courseTypes: [""],
    availableDays: "",
  });
  const [clientInfo, setClientInfo] = useState<ClientProfileMutation>({
    preferredWorkoutType: "",
    trainingLevel: "",
    physicalData: "",
  });

  const role = user.user?.role;

  if (role !== "client" && role !== "trainer") {
    throw new Error("Invalid role: expected 'client' or 'trainer'");
  }

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

  const clientProfileSubmit = (clientData: ClientProfileMutation) => {
    setClientInfo(clientData);
    onHandleNext();
  };

  const updatePersonalInfo = (
    personalData: UserInfoMutation | null,
    optionalData: TrainerProfileMutation | null,
    clientData: ClientProfileMutation | null,
  ) => {
    if (personalData) {
      onUserSubmit(personalData);
      setActiveStep(2);
      console.log(personalData, optionalInfo, clientInfo);
    }
    if (optionalData) {
      trainerProfileSubmit(optionalData);
      console.log(requiredInfo, optionalData);
    }
    if (clientData) {
      clientProfileSubmit(clientData);
      console.log(requiredInfo, clientData);
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
      {activeStep === 1 &&
        (user.user?.role === "client" ? (
          <ClientRegisterForm
            initialState={clientInfo}
            onSubmit={clientProfileSubmit}
            prevStep={onHandlePrev}
            updatePersonalInfo={updatePersonalInfo}
          />
        ) : (
          <TrainerRegisterForm
            initialState={optionalInfo}
            onSubmit={trainerProfileSubmit}
            prevStep={onHandlePrev}
            updatePersonalInfo={updatePersonalInfo}
          />
        ))}
      {activeStep === 2 && (
        <>
          <RegisterPreview
            requiredData={requiredInfo}
            optionalData={optionalInfo}
            clientData={clientInfo}
            role={role}
          />
          <Grid container display="flex" justifyContent="space-between">
            <Grid>
              <Button onClick={onHandlePrev} variant="outlined">
                Back
              </Button>
            </Grid>
            <Grid>
              <Button
                variant={"contained"}
                sx={{ my: 3 }}
                onClick={() => {
                  console.log(requiredInfo, optionalInfo, clientInfo);
                }}
              >
                Confirm
              </Button>
            </Grid>
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
