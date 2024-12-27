import { useEffect, useState } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  Container,
  Button,
  Box,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectCourseTypes } from "../CourseTypes/CourseTypesSlice.ts";
import {
  selectSearchCourses,
  selectSearchCoursesFetching,
} from "../courses/coursesSlice.ts";
import { selectTrainers } from "../trainers/trainersSlice.ts";
import { getTrainers } from "../trainers/trainersThunks.ts";
import { selectUser } from "../users/userSlice.ts";
import { fetchSearchCourses } from "../courses/coursesThunks.ts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CourseCard from "../courses/components/CourseCard.tsx";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";

interface FetchSearchCourseArgs {
  courseTypes: string[];
  trainers: string[];
  format: string[];
  schedule: string[];
}

const SearchSelectPage = () => {
  const user = useAppSelector(selectUser);
  const courseTypes = useAppSelector(selectCourseTypes);
  const courses = useAppSelector(selectSearchCourses);
  const isLoading = useAppSelector(selectSearchCoursesFetching);
  const trainers = useAppSelector(selectTrainers);
  const [filters, setFilters] = useState<FetchSearchCourseArgs>({
    format: [],
    schedule: [],
    trainers: [],
    courseTypes: [],
  });
  const schedule = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }

    dispatch(getTrainers(user._id));
  }, [dispatch, user]);

  const matches = useMediaQuery("(max-width:500px)");

  const handleCheckboxChange = (
    category: keyof FetchSearchCourseArgs,
    value: string,
  ) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[category];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prevFilters, [category]: updatedValues };
    });
  };

  const sendForm = async () => {
    try {
      await dispatch(fetchSearchCourses(filters));
    } catch (e) {
      console.error(e);
    }
  };

  const resetForm = () => {
    setFilters({
      format: [],
      schedule: [],
      trainers: [],
      courseTypes: [],
    });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} py={matches ? 2 : 4}>
        <Grid size={{ md: 3, lg: 3, xs: 12 }}>
          <FormGroup>
            <Grid
              display="flex"
              justifyContent="space-between"
              gap={1}
              flexWrap="wrap"
            >
              <Typography
                variant="h6"
                display="flex"
                justifyContent="space-between"
                gutterBottom
              >
                Сортировка
              </Typography>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.format.includes("group")}
                  onChange={() => handleCheckboxChange("format", "group")}
                />
              }
              label="Групповые"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.format.includes("single")}
                  onChange={() => handleCheckboxChange("format", "single")}
                />
              }
              label="Индивидуально"
            />
          </FormGroup>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Направление</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {courseTypes.map((type) => (
                  <FormControlLabel
                    key={type._id}
                    control={
                      <Checkbox
                        checked={filters.courseTypes.includes(type._id)}
                        onChange={() =>
                          handleCheckboxChange("courseTypes", type._id)
                        }
                      />
                    }
                    label={type.name}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Тренера</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {trainers.map((trainer) => (
                  <FormControlLabel
                    key={trainer.user._id}
                    control={
                      <Checkbox
                        checked={filters.trainers.includes(trainer.user._id)}
                        onChange={() =>
                          handleCheckboxChange("trainers", trainer.user._id)
                        }
                      />
                    }
                    label={`${trainer.user.firstName} ${trainer.user.lastName}`}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          <Typography variant="h6" gutterBottom>
            Расписание
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Дни недели</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {schedule.map((day, i) => (
                  <FormControlLabel
                    key={day + i}
                    control={
                      <Checkbox
                        checked={filters.schedule.includes(day)}
                        onChange={() => handleCheckboxChange("schedule", day)}
                      />
                    }
                    label={day}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Box gap={1} mt={2} display="flex" justifyContent="end">
            <Button
              variant="outlined"
              sx={{
                color: "gray",
                borderColor: "gray",
              }}
              onClick={resetForm}
            >
              Сбросить
              <DeleteForeverIcon />
            </Button>
            <Button variant="outlined" onClick={sendForm}>
              Сортировать
            </Button>
          </Box>
        </Grid>

        <Grid size={{ sm: 12, md: 9, lg: 9, xs: 12 }}>
          <Grid mb={3}>
            <Typography variant="h4" gutterBottom textAlign="center">
              Тренировки
            </Typography>
            <Typography variant="h6" component="p" textAlign="center">
              Выберете удобные дни для своих занятий
            </Typography>
          </Grid>
          <Grid container spacing={3} sx={{ mb: 5 }} display="flex">
            {!isLoading ? (
              courses.length > 0 ? (
                courses.map((course) => (
                  <Grid
                    key={course._id}
                    size={{ md: 4, lg: 4, sm: 6, xs: 12 }}
                    display="flex"
                    justifyContent="center"
                  >
                    <CourseCard course={course} isShort={true} />
                  </Grid>
                ))
              ) : (
                <Alert severity="info" sx={{ width: "100%" }}>
                  Здесь пока нет никаких курсов!
                </Alert>
              )
            ) : (
              <Grid display="flex" justifyContent="center" size={12}>
                <LoadingIndicator />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchSelectPage;
