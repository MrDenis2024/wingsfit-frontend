import React, { ChangeEvent, useState } from "react";
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourses } from "../coursesSlice.ts";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid2";

interface Props {
  onSubmit: (selectedSchedules: string[], type: string) => void;
  isLoading: boolean;
}

const SelectCourseForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const courses = useAppSelector(selectCourses);

  const [courseData, setCourseData] = useState({
    courseTypeName: "",
  });

  const [courseSchedules, setCourseSchedules] = useState<string[]>([]);

  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const courseInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedCourseTypeName = event.target.value;

    setCourseData({ courseTypeName: selectedCourseTypeName });

    const selectedCourseSchedules = courses
      .filter((course) => course.courseType.name === selectedCourseTypeName)
      .flatMap((course) => course.schedule);

    setCourseSchedules(selectedCourseSchedules);
    setSelectedSchedules([]);
  };

  const scheduleCheckboxChangeHandler = (schedule: string) => {
    setSelectedSchedules((prevSelected) =>
      prevSelected.includes(schedule)
        ? prevSelected.filter((s) => s !== schedule)
        : [...prevSelected, schedule],
    );
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !courseData.courseTypeName ||
      (courseSchedules.length > 0 && selectedSchedules.length === 0)
    ) {
      setErrorMessage("Выберите курс и расписание");
      return;
    }
    setErrorMessage("");
    onSubmit(selectedSchedules, courseData.courseTypeName);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid
        container
        direction="column"
        spacing={2}
        component="form"
        onSubmit={submitFormHandler}
      >
        <Grid>
          <FormControl fullWidth>
            <Typography sx={{ mb: 2 }}>Выберите курс</Typography>
            <TextField
              required
              select
              name="course"
              id="courseTypeName"
              value={courseData.courseTypeName}
              onChange={courseInputChangeHandler}
            >
              {Object.values(
                courses.reduce(
                  (acc, course) => {
                    acc[course.courseType.name] = course;
                    return acc;
                  },
                  {} as Record<string, (typeof courses)[0]>,
                ),
              ).map((uniqueCourse) => (
                <MenuItem
                  key={uniqueCourse.courseType.name}
                  value={uniqueCourse.courseType.name}
                >
                  {uniqueCourse.courseType.name}
                </MenuItem>
              ))}
            </TextField>
            {!!errorMessage && !courseData.courseTypeName && (
              <Typography color="error" mt={2}>
                {errorMessage}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid>
          {courseSchedules.length > 0 ? (
            <>
              <Typography variant="body1" gutterBottom>
                Выберите расписание:
              </Typography>
              {courseSchedules.map((schedule, index) => (
                <FormControlLabel
                  key={`${schedule}-${index}`}
                  control={
                    <Checkbox
                      checked={selectedSchedules.includes(schedule)}
                      onChange={() => scheduleCheckboxChangeHandler(schedule)}
                    />
                  }
                  label={schedule}
                />
              ))}
              {!!errorMessage &&
                courseSchedules.length > 0 &&
                selectedSchedules.length === 0 && (
                  <Typography color="error">{errorMessage}</Typography>
                )}
            </>
          ) : (
            courseData.courseTypeName && (
              <Typography>
                No schedules available for this course type.
              </Typography>
            )
          )}
        </Grid>
        <Grid>
          <LoadingButton
            type="submit"
            disabled={isLoading}
            loadingPosition="center"
            variant="contained"
          >
            <span>Submit</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectCourseForm;
