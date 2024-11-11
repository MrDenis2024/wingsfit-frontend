import React, { useState } from "react";
import { Grid2, MenuItem, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { CourseMutation } from "../../../types/courseTypes.ts";

interface Props {
  onSubmit: (course: CourseMutation) => void;
  isLoading: boolean;
}

const CourseForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState<CourseMutation>({
    title: "",
    description: "",
    format: "group",
    schedule: "",
    scheduleLength: "",
    price: 0,
    maxClients: 0,
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...state });
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Grid2
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={submitFormHandler}
    >
      <Grid2>
        <TextField
          required
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <TextField
          multiline
          minRows={3}
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <TextField
          select
          label="Format"
          id="format"
          name="format"
          value={state.format}
          onChange={inputChangeHandler}
        >
          <MenuItem value="group">Group</MenuItem>
          <MenuItem value="single">Single</MenuItem>
        </TextField>
      </Grid2>
      <Grid2>
        <TextField
          required
          label="Schedule"
          id="schedule"
          name="schedule"
          value={state.schedule}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <TextField
          required
          label="Schedule Length"
          id="scheduleLength"
          name="scheduleLength"
          value={state.scheduleLength}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <TextField
          label="Price"
          id="price"
          name="price"
          value={state.price}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <TextField
          required
          label="Max Clients"
          id="maxClients"
          name="maxClients"
          value={state.maxClients}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default CourseForm;
