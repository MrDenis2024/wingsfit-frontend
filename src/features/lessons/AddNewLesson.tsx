import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid2";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logoImage from "../../assets/images/logo.png";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { useState } from "react";
import { selectLessonsLoading } from "./lessonsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { createLesson } from "./lessonsThunk";
import { LessonMutation } from "../../types/lessonTypes";

const AddNewLesson = () => {
  const Textarea = styled(BaseTextareaAutosize)({
    color: "currentColor",
    font: "inherit",
    fontFamily: "Roboto, Helvetica Arial, sans-serif",
    fontSize: "16px",
    border: "1px solid grey",
    borderRadius: "5px",
    fontWeight: "400",
    boxSizing: "border-box",
    width: "100%",
    padding: "16px 14px",
    boxShadow: "none",
    outline: "none",
    "&:focus": {
      border: "2px solid #1976d2",
    },
  });

  const [state, setState] = useState<LessonMutation>({
    course: "672cade9cc1f8f43e89c74ff",
    title: "",
    timeZone: {
      value: "",
      label: "",
    },
    groupLevel: "",
    quantityClients: "",
    ageLimit: "",
    description: "",
    participants: [],
    presentUser: [],
  });

  const loading = useAppSelector(selectLessonsLoading);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (
        !state.course.trim() ||
        !state.title.trim() ||
        !state.timeZone ||
        Number(state.groupLevel) < 1 ||
        Number(state.quantityClients) < 1
      ) {
        setError(true);
      } else {
        console.log(state);
        await dispatch(createLesson(state)).unwrap();
        setError(false);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: String(value),
    }));
  };

  const courseChange = (event: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <>
      <Stack sx={{ width: "100%" }} textAlign="center" mt={3}>
        <Stack alignItems="center" justifyContent="center" m={4}>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={logoImage}
              alt="logo"
              sx={{ width: 150, height: 100, mb: 2 }}
            />
            <Typography component="h1" variant="h4" gutterBottom>
              Add new Lesson
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={submitFormHandler}
              sx={{ width: "100%", mx: "auto" }}
            >
              <Grid container direction="column" spacing={2}>
                {error && (
                  <Alert severity="error">
                    Fill in the fields: Course, Title, Time Zone, Quantity
                    clients, Group Level!
                  </Alert>
                )}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Course
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state.course}
                      label="Course"
                      onChange={courseChange}
                      required
                      name="course"
                    >
                      <MenuItem value={"672cade9cc1f8f43e89c74ff"}>
                        one
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Grid>
                  <TextField
                    required
                    type="text"
                    label="Title"
                    name="title"
                    value={state.title}
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    type="text"
                    label="Time Zone"
                    name="timeZone"
                    value={state.timeZone.label}
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    type="number"
                    label="Quantity clients"
                    name="quantityClients"
                    value={state.quantityClients}
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    type="number"
                    label="Group Level"
                    name="groupLevel"
                    value={state.groupLevel}
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid>
                  <TextField
                    required
                    type="number"
                    label="Age Limit"
                    name="ageLimit"
                    value={state.ageLimit}
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid>
                  <Textarea
                    minRows={1}
                    value={state.description}
                    onChange={inputChangeHandler}
                    name="description"
                    placeholder="Description"
                  />
                </Grid>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="outlined"
                  loading={loading}
                >
                  Save
                </LoadingButton>
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default AddNewLesson;
