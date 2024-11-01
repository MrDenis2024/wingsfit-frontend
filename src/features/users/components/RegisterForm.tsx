import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ClientFields } from "../../../types/clientTypes";
import { TrainerFields } from "../../../types/trainerTypes";
import TimeZone from "../../../UI/TimeZone/TimeZone";
import FileInput from "../../../UI/FileInput/FileInput";

interface RegisterFormProps {
  role: string;
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  onSubmit: (data: ClientFields | TrainerFields) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  role,
  activeStep,
  handleNext,
  handleBack,
  onSubmit,
}) => {
  const [clientData, setClientData] = useState<ClientFields>({
    firstName: "",
    lastName: "",
    timeZone: "",
    health: "",
    age: "",
    gender: "",
    avatar: null,
  });

  const [trainerData, setTrainerData] = useState<TrainerFields>({
    firstName: "",
    lastName: "",
    timeZone: "",
    avatar: null,
    courseTypes: [],
  });

  const course = ["Yoga", "Fitness", "Zumba", "Jogging", "All"];

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (role === "trainer") {
      setTrainerData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setClientData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const changeTimezone = (timezone: string) => {
    if (role === "trainer") {
      setTrainerData((prevState) => ({
        ...prevState,
        timeZone: timezone,
      }));
    } else if (role === "client") {
      setClientData((prevState) => ({
        ...prevState,
        timeZone: timezone,
      }));
    }
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    if (role === "trainer") {
      setTrainerData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setClientData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCourseTypeChange = (type: string) => {
    setTrainerData((prevState) => {
      const currentIndex = prevState.courseTypes.indexOf(type);
      const newCourseTypes = [...prevState.courseTypes];

      if (currentIndex === -1) {
        newCourseTypes.push(type);
      } else {
        newCourseTypes.splice(currentIndex, 1);
      }

      return { ...prevState, courseTypes: newCourseTypes };
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const dataToSubmit = role === "trainer" ? trainerData : clientData;
    onSubmit({ ...dataToSubmit });
  };

  return (
    <Stack>
      {activeStep === 1 && (
        <Stack spacing={2} mt={3}>
          <Typography variant="h6">Fill Basic Info</Typography>
          <TextField
            type="text"
            name="firstName"
            placeholder="First Name"
            fullWidth
            value={
              role === "trainer" ? trainerData.firstName : clientData.firstName
            }
            onChange={inputChangeHandler}
            required
          />
          <TextField
            type="text"
            name="lastName"
            placeholder="Last Name"
            fullWidth
            value={
              role === "trainer" ? trainerData.lastName : clientData.lastName
            }
            onChange={inputChangeHandler}
            required
          />
          <TimeZone
            name={role === "trainer" ? "trainer" : "client"}
            changeTimezone={changeTimezone}
          />
        </Stack>
      )}

      {activeStep === 2 && (
        <Box>
          <Typography variant="h6">Fill Additional Info</Typography>
          <Box mb={2}>
            <FileInput
              onChange={fileInputChangeHandler}
              name="avatar"
              label="Upload Avatar"
            />
          </Box>

          {role === "trainer" ? (
            <Box>
              <Typography variant="subtitle1">Select Course Type:</Typography>
              <FormGroup>
                {course.map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        checked={trainerData.courseTypes.includes(type)}
                        onChange={() => handleCourseTypeChange(type)}
                      />
                    }
                    label={type}
                  />
                ))}
              </FormGroup>
            </Box>
          ) : (
            <Box>
              <Box mb={2}>
                <TextField
                  type="text"
                  name="health"
                  placeholder="Health"
                  value={clientData.health}
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={clientData.age}
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Select Gender:</Typography>
                <RadioGroup
                  value={clientData.gender}
                  onChange={(e) =>
                    inputChangeHandler({
                      target: { name: "gender", value: e.target.value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="another"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Box>
            </Box>
          )}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={activeStep === 2 ? submitHandler : handleNext}>
          {activeStep === 2 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Stack>
  );
};

export default RegisterForm;
