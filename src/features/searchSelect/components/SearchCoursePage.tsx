import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCourseTypes} from "../../CourseTypes/CourseTypesSlice.ts";
import {selectSearchCourses, selectSearchCoursesFetching} from "../../courses/coursesSlice.ts";
import {selectTrainers} from "../../trainers/trainersSlice.ts";
import {getTrainers} from "../../trainers/trainersThunks.ts";
import {
  Accordion, AccordionDetails,
  AccordionSummary, Box, Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useMediaQuery
} from "@mui/material";
import {fetchSearchCourses} from "../../courses/coursesThunks.ts";
import {fetchCourseTypes} from "../../CourseTypes/CourseTypesThunks.ts";
import {FetchSearchCourseArgs} from "../../../types/courseTypes.ts";
import {selectUser} from "../../users/userSlice.ts";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchCourseCards from "./SearchCourseCards.tsx";
import {DAYS_OF_WEEK} from "../../../constants.ts";


const SearchCoursePage = () => {
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }

    dispatch(getTrainers(user._id));
    dispatch(fetchCourseTypes());
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
    <Grid container spacing={1} py={matches ? 2 : 4}>
      <Grid size={{ md: 3, lg: 3, xs: 12 }} border="1px solid #ccc" borderRadius="4px">
        <FormGroup>
          <Grid
            mx={2}
          >
            <Typography
              variant="h6"
              mt={1}
              gutterBottom
            >
              Сортировка
            </Typography>

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
          </Grid>
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

        <Typography m={2} variant="h6" gutterBottom>
          Расписание
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Дни недели</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {DAYS_OF_WEEK.map((day, i) => (
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
        <Box gap={1} p={1} display="flex" justifyContent="end">
          <Button
            variant="outlined"
            sx={{
              color: "gray",
              borderColor: "gray",
              fontSize: "11px",
            }}
            onClick={resetForm}
          >
            Сбросить
            <DeleteForeverIcon />
          </Button>
          <Button variant="outlined" sx={{fontSize: "11px"}} onClick={sendForm}>
            Сортировать
          </Button>
        </Box>
      </Grid>

      <Grid size={{ sm: 12, md: 9, lg: 9, xs: 12 }} border="1px solid #ccc" pt={2} px={2} borderRadius="4px">
        <Grid mb={3}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Тренировки
          </Typography>
          <Typography variant="h6" component="p" textAlign="center">
            Выберете удобные дни для своих занятий
          </Typography>
        </Grid>
        <SearchCourseCards courses={courses} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default SearchCoursePage;