import React, { useState } from "react";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { CourseMutation, ICourse } from "../../../types/courseTypes.ts";
import { useAppSelector } from "../../../app/hooks.ts";
import {
  selectCourseTypes,
  selectCourseTypesFetching,
} from "../../CourseTypes/CourseTypesSlice.ts";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import Grid from "@mui/material/Grid2";
import { selectCourseError } from "../coursesSlice.ts";

interface Props {
  onSubmit: (course: CourseMutation) => void;
  isLoading: boolean;
  existingCourse?: ICourse;
}

const DAYS_OF_WEEK = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const CourseForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  existingCourse,
}) => {
  const courseTypes = useAppSelector(selectCourseTypes);
  const courseTypesFetching = useAppSelector(selectCourseTypesFetching);
  const error = useAppSelector(selectCourseError);
  const [state, setState] = useState<CourseMutation>({
    title: existingCourse ? existingCourse.title : "",
    courseType: existingCourse ? existingCourse.courseType._id : "",
    description: existingCourse ? existingCourse.description : "",
    format: existingCourse ? existingCourse.format : "group",
    schedule: existingCourse ? existingCourse.schedule : [],
    price: existingCourse ? existingCourse.price.toString() : "",
    image: null,
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

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : state.image;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleScheduleChange = (day: string) => {
    setState((prevState) => ({
      ...prevState,
      schedule: prevState.schedule.includes(day)
        ? prevState.schedule.filter((d) => d !== day)
        : [...prevState.schedule, day],
    }));
  };

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message || null;
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={submitFormHandler}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        {existingCourse ? "Редактировать курс" : "Новый курс"}
      </Typography>
      <Grid>
        <TextField
          required
          label="Название"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError("title"))}
          helperText={getFieldError("title")}
        />
      </Grid>
      <Grid>
        {courseTypesFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Типы"
            id="courseType"
            name="courseType"
            value={state.courseType}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError("courseType"))}
            helperText={getFieldError("courseType")}
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
      </Grid>
      <Grid>
        <TextField
          multiline
          required
          minRows={3}
          label="Описание"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError("description"))}
          helperText={getFieldError("description")}
        />
      </Grid>
      <Grid>
        <TextField
          select
          label="Формат"
          required
          id="format"
          name="format"
          value={state.format}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError("format"))}
          helperText={getFieldError("format")}
        >
          <MenuItem value="group">Групповой</MenuItem>
          <MenuItem value="single">Индивидуальный</MenuItem>
        </TextField>
      </Grid>
      <Grid>
        <Typography variant="h6">Расписание:</Typography>
        <FormGroup row>
          {DAYS_OF_WEEK.map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={state.schedule.includes(day)}
                  onChange={() => handleScheduleChange(day)}
                />
              }
              label={day}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid>
        <TextField
          required
          label="Цена"
          id="price"
          name="price"
          type="number"
          value={state.price}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError("price"))}
          helperText={getFieldError("price")}
        />
      </Grid>
      {!existingCourse && (
        <Grid>
          <FileInput
            label="Изображение"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>
      )}
      <Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
          disabled={state.schedule.length === 0 || isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Сохранить</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CourseForm;
