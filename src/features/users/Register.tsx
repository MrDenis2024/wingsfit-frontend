import { useState } from "react";
import { Stack, Step, StepLabel, Stepper } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { googleLogin } from "./userThunk";
import { ClientFields } from "../../types/clientTypes";
import { TrainerFields } from "../../types/trainerTypes";
import RegisterForm from "./components/RegisterForm.tsx";

const steps = ["Login via Google", "Fill Basic Info", "Fill Additional Info"];

const Register = () => {
  const { role } = useParams() as { role: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(
        googleLogin({ credential: credentialResponse.credential, role: role }),
      ).unwrap();
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (data: ClientFields | TrainerFields) => {
    console.log("Submitting data:", data);
    navigate("/");
  };

  return (
    <Stack sx={{ width: "100%" }} mt={3}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack>
        {activeStep === 0 && (
          <Stack alignItems="center" justifyContent="center" m={4}>
            <GoogleLogin
              onSuccess={googleLoginHandler}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Stack>
        )}

        <RegisterForm
          role={role}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          onSubmit={handleSubmit}
        />
      </Stack>
    </Stack>
  );
};

export default Register;
