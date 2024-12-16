import { useState } from "react";
import { Button, Container, Step, StepLabel, Stepper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserRegisterForm from "./components/UserRegisterForm.tsx";
import TrainerRegisterForm from "./components/TrainerRegisterForm.tsx";
import { UserInfoMutation } from "../../types/userTypes.ts";
import {
  FullTrainerProfileMutation,
  TrainerProfileMutation,
} from "../../types/trainerTypes.ts";
import RegisterPreview from "./components/RegisterPreview.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "./userSlice.ts";
import {
  ClientProfileMutation,
  FullClientProfileMutation,
} from "../../types/clientTypes.ts";
import ClientRegisterForm from "./components/ClientRegisterForm.tsx";
import { createClientProfile } from "../clients/clientThunk.ts";
import { createTrainerProfile } from "../trainers/trainersThunks.ts";
import { useNavigate } from "react-router-dom";
import { resetTrainerError } from "../trainers/trainersSlice.ts";
import { toast } from "react-toastify";
import { resetClientError } from "../clients/clientSlice.ts";
import { reloadUser } from "./userThunk.ts";

const OnBoardingProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const stepLabels = [
    "Персональные данные",
    "Профильные данные",
    "Предпросмотр",
  ];
  const [activeStep, setActiveStep] = useState<number>(0);

  const [requiredInfo, setRequiredInfo] = useState<UserInfoMutation>({
    firstName: "",
    lastName: "",
    timeZone: { value: "", label: "" },
    phoneNumber: "",
    dateOfBirth: "",
    gender: "male",
  });
  const [optionalInfo, setOptionalInfo] = useState<TrainerProfileMutation>({
    description: "",
    specialization: "",
    experience: "",
    courseTypes: [],
    availableDays: "",
  });
  const [clientInfo, setClientInfo] = useState<ClientProfileMutation>({
    preferredWorkoutType: [],
    trainingLevel: "junior",
    physicalData: "",
  });

  const role = user?.role;

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
    }
    if (optionalData) {
      trainerProfileSubmit(optionalData);
    }
    if (clientData) {
      clientProfileSubmit(clientData);
    }
  };

  const createProfile = async (
    personalData: UserInfoMutation,
    trainerData: TrainerProfileMutation,
    clientData: ClientProfileMutation,
  ) => {
    try {
      if (role === "client") {
        const clientProfile: FullClientProfileMutation = {
          ...personalData,
          ...clientData,
        };

        await dispatch(createClientProfile(clientProfile)).unwrap();
      } else if (role === "trainer") {
        const trainerProfile: FullTrainerProfileMutation = {
          ...personalData,
          ...trainerData,
        };
        await dispatch(createTrainerProfile(trainerProfile)).unwrap();
      }
      await dispatch(reloadUser());
      dispatch(resetTrainerError());
      dispatch(resetClientError());
      navigate("/");
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        my: 3,
      }}
    >
      <Grid container>
        <Grid size={12}>
          {activeStep === 0 && (
            <UserRegisterForm
              initialState={requiredInfo}
              onSubmit={onUserSubmit}
              updatePersonalInfo={updatePersonalInfo}
            />
          )}
          {activeStep === 1 &&
            (user?.role === "client" ? (
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
              <Grid
                container
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid>
                  <Button onClick={onHandlePrev} variant="outlined">
                    Назад
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant={"contained"}
                    sx={{ my: 3 }}
                    onClick={() => {
                      void createProfile(
                        requiredInfo,
                        optionalInfo,
                        clientInfo,
                      );
                    }}
                  >
                    Отправить
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Grid size={12}>
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
      </Grid>
    </Container>
  );
};

export default OnBoardingProfile;
