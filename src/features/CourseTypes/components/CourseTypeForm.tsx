import React, { useState } from "react";
import { CourseTypeFields } from "../../../types/courseTypes.ts";
import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCreateCourseTypeError } from "../CourseTypesSlice.ts";

interface Props {
  onSubmit: (courseType: CourseTypeFields) => void;
  onClose: () => void;
  isLoading: boolean;
}

const CourseTypeForm: React.FC<Props> = ({ onSubmit, isLoading, onClose }) => {
  const error = useAppSelector(selectCreateCourseTypeError);
  const [state, setState] = useState<CourseTypeFields>({
    name: "",
    description: "",
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
      <Grid>
        <TextField
          required
          label="Название"
          id="name"
          name="name"
          value={state.name}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError("name"))}
          helperText={getFieldError("name")}
        />
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
      <Grid container justifyContent="flex-end">
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{
            textTransform: "none",
            borderColor: "error.main",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            },
          }}
        >
          Отмена
        </Button>
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

export default CourseTypeForm;
