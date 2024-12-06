import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectCourses,
  selectCoursesFetching,
} from "../../courses/coursesSlice.ts";
import { GroupMutation } from "../../../types/groupTypes.ts";
import { fetchCourses } from "../../courses/coursesThunks.ts";
import {
  CircularProgress,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { selectUser } from "../../users/userSlice.ts";

interface Props {
  onSubmit: (course: GroupMutation) => void;
  isLoading: boolean;
}

const GroupForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const coursesFetching = useAppSelector(selectCoursesFetching);
  const user = useAppSelector(selectUser);
  const [state, setState] = useState<GroupMutation>({
    title: "",
    course: "",
    startTime: "",
    trainingLevel: "junior",
  });

  useEffect(() => {
    dispatch(fetchCourses(user?._id));
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
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

  const handleChange = (event: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      trainingLevel: event.target.value,
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
        {coursesFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Course"
            id="course"
            name="course"
            value={state.course}
            onChange={inputChangeHandler}
          >
            <MenuItem value="" disabled>
              Select course
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid2>
      <Grid2>
        <TextField
          required
          type="Time"
          id="startTime"
          name="startTime"
          value={state.startTime}
          onChange={inputChangeHandler}
        />
      </Grid2>
      <Grid2>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Training level</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.trainingLevel}
            label="Training level"
            variant="outlined"
            onChange={handleChange}
          >
            <MenuItem value={"junior"}>Junior</MenuItem>
            <MenuItem value={"middle"}>Middle</MenuItem>
            <MenuItem value={"advanced"}>Advanced</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Create</span>
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default GroupForm;
