import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserInfoMutation } from "../../../types/userTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";

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
  const [profileData, setProfileData] =
    useState<TrainerProfileMutation>(initialState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onAddCourseType = () => {
    setProfileData((prevState) => ({
      ...prevState,
      courseTypes: [...prevState.courseTypes, ""],
    }));
  };
  const onDeleteCourseType = (index: number) => {
    setProfileData((prevState) => ({
      ...prevState,
      courseTypes: prevState.courseTypes.filter((_, i) => i !== index),
    }));
  };

  const courseTypeChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value } = event.target;
    setProfileData((prevState) => {
      const courseTypesCopy = [...prevState.courseTypes];
      courseTypesCopy[index] = value;
      return {
        ...prevState,
        courseTypes: courseTypesCopy,
      };
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(profileData);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      component={"form"}
      sx={{ my: 3 }}
      onSubmit={submitHandler}
    >
      <Grid>
        <Typography variant="h6">Fill optional Info</Typography>
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Description"
          name="description"
          onChange={inputChangeHandler}
          value={profileData.description}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Specialization"
          name="specialization"
          onChange={inputChangeHandler}
          value={profileData.specialization}
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          multiline
          minRows={2}
          label="Experience"
          name="experience"
          onChange={inputChangeHandler}
          value={profileData.experience}
        />
      </Grid>
      {profileData.courseTypes.map((item, index) => (
        <Grid container alignItems={"center"} key={index + "courseType"}>
          <Grid size={index > 0 ? 11 : 12}>
            <TextField
              type="text"
              fullWidth
              label="Course Type"
              name="courseTypes"
              onChange={(event) => courseTypeChangeHandler(event, index)}
              value={item}
            />
          </Grid>
          {index > 0 && (
            <Grid size={1}>
              <IconButton
                color="error"
                onClick={() => onDeleteCourseType(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
      <Grid textAlign="center">
        <IconButton size="large" color="primary" onClick={onAddCourseType}>
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Available Days"
          name="availableDays"
          onChange={inputChangeHandler}
          value={profileData.availableDays}
        />
      </Grid>
      <Grid container display="flex" justifyContent="space-between">
        <Grid>
          <Button onClick={prevStep} variant="outlined">
            Back
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() => updatePersonalInfo(null, profileData, null)}
          >
            Finish
          </Button>
        </Grid>
        <Grid>
          <Button type={"submit"} variant="outlined">
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TrainerRegisterForm;
