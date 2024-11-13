import React, { useEffect, useState } from "react";
import { CircularProgress, Grid2, MenuItem, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { CourseMutation } from "../../../types/courseTypes.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectCourseTypes,
  selectCourseTypesFetching,
} from "../../CourseTypes/CourseTypesSlice.ts";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import { fetchCourseTypes } from "../../CourseTypes/CourseTypesThunks.ts";

interface Props {
  onSubmit: (course: CourseMutation) => void;
  isLoading: boolean;
}

const CourseForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const dispatch = useAppDispatch();
  const courseTypes = useAppSelector(selectCourseTypes);
  const courseTypesFetching = useAppSelector(selectCourseTypesFetching);
  const [state, setState] = useState<CourseMutation>({
    title: "",
    courseType: "",
    description: "",
    format: "group",
    schedule: "",
    scheduleLength: "",
    price: "",
    maxClients: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCourseTypes());
  }, [dispatch]);

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

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

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
        {courseTypesFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Course Type"
            id="courseType"
            name="courseType"
            value={state.courseType}
            onChange={inputChangeHandler}
          >
            <MenuItem value="" disabled>
              Select course
            </MenuItem>
            {courseTypes.map((courseType) => (
              <MenuItem key={courseType._id} value={courseType._id}>
                {courseType.name}
              </MenuItem>
            ))}
          </TextField>
        )}
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
          required
          label="Price"
          id="price"
          name="price"
          type="number"
          inputProps={{ min: 0 }}
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
          type="number"
          inputProps={{ min: 0 }}
          value={state.maxClients}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
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
