import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Box, Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography, useMediaQuery
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {DAYS_OF_WEEK} from "../../../constants.ts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/userSlice.ts";
import {selectCourseTypes} from "../../CourseTypes/CourseTypesSlice.ts";
import {selectFetchingSearchTrainers, selectSearchTrainers} from "../../trainers/trainersSlice.ts";
import {fetchCourseTypes} from "../../CourseTypes/CourseTypesThunks.ts";
import {SearchTrainersArgs} from "../../../types/trainerTypes.ts";
import {getSearchTrainers} from "../../trainers/trainersThunks.ts";
import SearchTrainersCards from "./SearchTrainersCards.tsx";

const SearchTrainersPage = () => {
  const user = useAppSelector(selectUser);
  const courseTypes = useAppSelector(selectCourseTypes);
  const trainers = useAppSelector(selectSearchTrainers);
  const isLoading = useAppSelector(selectFetchingSearchTrainers);

  const [filters, setFilters] = useState<SearchTrainersArgs>({
    rating: false,
    schedule: [],
    courseTypes: [],
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }

    dispatch(fetchCourseTypes());
  }, [dispatch, user]);

  const matches = useMediaQuery("(max-width:500px)");


  const handleCheckboxChange = (
    category: keyof SearchTrainersArgs,
    value: string | boolean,
  ) => {
    setFilters((prevState) => {
      if (category === 'rating' && typeof value === 'boolean') {
        return { ...prevState, [category]: value };
      }

      const currentValues = prevState[category as keyof SearchTrainersArgs] as string[];
      const updatedValues = currentValues.includes(value as string)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value as string];

      return { ...prevState, [category]: updatedValues };
    });
  };

  const sendForm = async () => {
    try {
      await dispatch(getSearchTrainers(filters));
    } catch (e) {
      console.error(e);
    }
  };

  const resetForm = () => {
    setFilters({
      rating: false,
      schedule: [],
      courseTypes: [],
    });
  };

  return (
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
                checked={filters.rating}
                onChange={() => handleCheckboxChange("rating", !filters.rating)}
              />
            }
            label="По рейтингу"
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

        <Typography variant="h6" gutterBottom>
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
            Выбери своего тренера!
          </Typography>
          <Typography variant="h6" component="p" textAlign="center">
            Выберете удобные дни для своих занятий
          </Typography>
        </Grid>
        <SearchTrainersCards trainers={trainers} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default SearchTrainersPage;