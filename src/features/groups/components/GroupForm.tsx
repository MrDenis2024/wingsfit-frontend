import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectCourses,
  selectCoursesFetching,
} from "../../courses/coursesSlice.ts";
import { GroupMutation } from "../../../types/groupTypes.ts";
import { fetchCourses } from "../../courses/coursesThunks.ts";
import { CircularProgress, Grid2, MenuItem, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
  onSubmit: (course: GroupMutation) => void;
  isLoading: boolean;
}

const GroupForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const coursesFetching = useAppSelector(selectCoursesFetching);
  const [state, setState] = useState<GroupMutation>({
    title: "",
    course: "",
    startTime: "",
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(state);
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
          label="Start Time"
          id="startTime"
          name="startTime"
          value={state.startTime}
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

export default GroupForm;
