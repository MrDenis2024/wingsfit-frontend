import React, { useState } from "react";
import { CircularProgress, MenuItem, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { CourseMutation } from "../../../types/courseTypes.ts";
import { useAppSelector } from "../../../app/hooks.ts";
import {
  selectCourseTypes,
  selectCourseTypesFetching,
} from "../../CourseTypes/CourseTypesSlice.ts";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import Grid from "@mui/material/Grid2";

interface Props {
  onSubmit: (course: CourseMutation) => void;
  isLoading: boolean;
}

const CourseForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
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
          minRows={3}
          label="Описание"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          select
          label="Формат"
          id="format"
          name="format"
          value={state.format}
          onChange={inputChangeHandler}
        >
          <MenuItem value="group">Групповой</MenuItem>
          <MenuItem value="single">Индивидуальный</MenuItem>
        </TextField>
      </Grid>
      <Grid>
        <TextField
          required
          label="Расписание"
          id="schedule"
          name="schedule"
          value={state.schedule}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          label="Продолжительность"
          id="scheduleLength"
          name="scheduleLength"
          value={state.scheduleLength}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          label="Цена"
          id="price"
          name="price"
          type="number"
          inputProps={{ min: 0 }}
          value={state.price}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          required
          label="Максимум клиентов"
          id="maxClients"
          name="maxClients"
          type="number"
          inputProps={{ min: 0 }}
          value={state.maxClients}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput
          label="Изображение"
          name="image"
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
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
