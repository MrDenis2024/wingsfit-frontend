import React, { useEffect, useState } from "react";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Grid2,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createLesson } from "./lessonsThunk";
import { useNavigate } from "react-router-dom";
import { LessonMutation } from "../../types/lessonTypes";
import {
  selectCourses,
  selectCoursesFetching,
} from "../courses/coursesSlice.ts";
import { selectLessonCreating } from "./lessonsSlice.ts";
import { fetchCourses } from "../courses/coursesThunks.ts";
import TimeZone from "../../UI/TimeZone/TimeZone.tsx";

const AddNewLesson = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState<LessonMutation>({
    course: "",
    title: "",
    timeZone: {
      value: "",
      label: "",
    },
    groupLevel: "",
    quantityClients: "",
    ageLimit: "",
    description: "",
    participants: [],
    presentUser: [],
  });

  const [error, setError] = useState(false);
  const courses = useAppSelector(selectCourses);
  const loading = useAppSelector(selectLessonCreating);
  const coursesLoading = useAppSelector(selectCoursesFetching);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !state.course ||
      !state.title.trim() ||
      !state.timeZone.value ||
      !state.groupLevel ||
      !state.quantityClients
    ) {
      setError(true);
      return;
    }
    try {
      await dispatch(createLesson(state)).unwrap();
      navigate("/lessons");
    } catch (e) {
      console.error(e);
    }
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

  const courseChangeHandler = (event: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      course: event.target.value,
    }));
  };

  const changeTimezone = (timezoneValue: string, timezoneLabel: string) => {
    setState((prevState) => ({
      ...prevState,
      timeZone: { value: timezoneValue, label: timezoneLabel },
    }));
  };

  return (
    <Grid2
      container
      spacing={2}
      justifyContent="center"
      sx={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    >
      <Typography variant="h4" mb={3} textAlign="center">
        Add New Lesson
      </Typography>
      <form onSubmit={submitFormHandler}>
        {error && <Alert severity="error">Fill in all required fields!</Alert>}
        {coursesLoading && (
          <LoadingButton loading={true} fullWidth>
            Loading...
          </LoadingButton>
        )}
        {!coursesLoading && courses.length === 0 && (
          <Alert severity="error">Courses are unavailable</Alert>
        )}

        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <FormControl fullWidth>
              <InputLabel>Course *</InputLabel>
              <Select
                value={state.course}
                onChange={courseChangeHandler}
                required
                name="course"
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={12}>
            <TextField
              required
              label="Title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              required
              label="Group Level"
              type="number"
              name="groupLevel"
              value={state.groupLevel}
              onChange={inputChangeHandler}
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              required
              label="Quantity Clients"
              type="number"
              name="quantityClients"
              value={state.quantityClients}
              onChange={inputChangeHandler}
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              label="Age Limit"
              type="number"
              name="ageLimit"
              value={state.ageLimit}
              onChange={inputChangeHandler}
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              label="Description"
              name="description"
              value={state.description}
              onChange={inputChangeHandler}
              fullWidth
              multiline
              rows={3}
            />
          </Grid2>

          <Grid2 size={12}>
            <TimeZone
              name="timeZone"
              changeTimezone={changeTimezone}
              value={state.timeZone}
            />
          </Grid2>
        </Grid2>

        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Save
        </LoadingButton>
      </form>
    </Grid2>
  );
};

export default AddNewLesson;
