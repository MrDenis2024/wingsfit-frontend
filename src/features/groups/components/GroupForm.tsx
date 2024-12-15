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
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { selectUser } from "../../users/userSlice.ts";
import Grid from "@mui/material/Grid2";

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
  }, [dispatch, user?._id]);

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

  const handleChange = (event: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      trainingLevel: event.target.value,
    }));
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={submitFormHandler}
    >
      <Grid>
        <TextField
          required
          label="Название"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid>
        {coursesFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Курс"
            id="course"
            name="course"
            value={state.course}
            onChange={inputChangeHandler}
          >
            <MenuItem value="" disabled>
              Выберите курс
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      <Grid>
        <TextField
          required
          type="Time"
          id="startTime"
          name="startTime"
          value={state.startTime}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Уровень тренировок
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.trainingLevel}
            label="Уровень тренировок"
            variant="outlined"
            onChange={handleChange}
          >
            <MenuItem value={"junior"}>Начальный</MenuItem>
            <MenuItem value={"middle"}>Средний</MenuItem>
            <MenuItem value={"advanced"}>Продвинутый</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Создать</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default GroupForm;
