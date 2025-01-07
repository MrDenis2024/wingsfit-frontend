import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectCourses,
  selectCoursesFetching,
} from "../../courses/coursesSlice.ts";
import { GroupMutation, IGroup } from "../../../types/groupTypes.ts";
import { fetchCourses } from "../../courses/coursesThunks.ts";
import {
  Box,
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
  existingGroup?: IGroup;
}

const GroupForm: React.FC<Props> = ({ onSubmit, isLoading, existingGroup }) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const coursesFetching = useAppSelector(selectCoursesFetching);
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<GroupMutation>({
    title: existingGroup ? existingGroup.title : "",
    course: existingGroup ? existingGroup.course._id : "",
    startTime: existingGroup ? existingGroup.startTime : "",
    trainingLevel: existingGroup ? existingGroup.trainingLevel : "junior",
    maxClients: existingGroup ? existingGroup.maxClients.toString() : "",
    scheduleLength: existingGroup
      ? existingGroup.scheduleLength.toString()
      : "",
  });

  const [isIndividual, setIsIndividual] = useState(false);

  const isCourseIndividual = useCallback(
    (courseId: string): boolean => {
      const selectedCourse = courses.find((course) => course._id === courseId);
      return selectedCourse?.format === "single" || false;
    },
    [courses],
  );

  useEffect(() => {
    dispatch(fetchCourses(user?._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (existingGroup) {
      const individual = isCourseIndividual(existingGroup.course._id);
      setIsIndividual(individual);
    }
  }, [courses, existingGroup, isCourseIndividual]);

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

  const handleCourseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCourseId = event.target.value;
    const individual = isCourseIndividual(selectedCourseId);

    setState((prevState) => ({
      ...prevState,
      course: selectedCourseId,
      maxClients: individual ? "1" : prevState.maxClients,
    }));
    setIsIndividual(individual);
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
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
          label="Название группы"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>

      <Grid>
        {coursesFetching ? (
          <Box display="flex" justifyContent="center" width="100%">
            <CircularProgress />
          </Box>
        ) : (
          <TextField
            required
            select
            label="Курс"
            id="course"
            name="course"
            value={state.course || ""}
            onChange={handleCourseChange}
            disabled={!!existingGroup}
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
          type="time"
          id="startTime"
          name="startTime"
          value={state.startTime}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          type="number"
          id="maxClients"
          label="Максимум клиентов в группе"
          name="maxClients"
          slotProps={{
            htmlInput: {
              min: 1,
            },
          }}
          value={state.maxClients}
          onChange={inputChangeHandler}
          disabled={isIndividual}
        />
      </Grid>
      <Grid>
        <TextField
          required
          type="number"
          id="scheduleLength"
          label="Продолжительность занятия (в часах)"
          name="scheduleLength"
          slotProps={{
            htmlInput: {
              max: 5,
              min: 1,
            },
          }}
          value={state.scheduleLength}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FormControl fullWidth>
          <InputLabel id="training-level-label">Уровень тренировок</InputLabel>
          <Select
            required
            labelId="training-level-label"
            id="training-level"
            value={state.trainingLevel}
            label="Уровень тренировок"
            variant="outlined"
            onChange={handleLevelChange}
          >
            <MenuItem value="junior">Начальный</MenuItem>
            <MenuItem value="middle">Средний</MenuItem>
            <MenuItem value="advanced">Продвинутый</MenuItem>
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
