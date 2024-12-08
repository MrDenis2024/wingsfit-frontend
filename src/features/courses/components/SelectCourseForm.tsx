import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourses } from "../coursesSlice.ts";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  onSubmit: (selectedSchedules: string[]) => void;
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

  const courseInputChangeHandler = (event: SelectChangeEvent) => {
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
    onSubmit(selectedSchedules);
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
        <FormControl fullWidth>
          <InputLabel>Выберите курс</InputLabel>
          <Select
            id="courseTypeName"
            value={courseData.courseTypeName}
            label="choose course"
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
          </Select>
          {!!errorMessage && !courseData.courseTypeName && (
            <Typography color="error" mt={2}>
              {errorMessage}
            </Typography>
          )}
        </FormControl>
      </Grid2>
      <Grid2>
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
      </Grid2>
      <Grid2>
        <LoadingButton
          type="submit"
          disabled={isLoading}
          loadingPosition="center"
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default SelectCourseForm;
