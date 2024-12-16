// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   TextField,
//   Typography,
//    Container,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { createLesson } from "./lessonsThunk";
// import { useNavigate } from "react-router-dom";
// import { LessonMutation } from "../../types/lessonTypes";
// import {
//   selectCourses,
//   selectCoursesFetching,
// } from "../courses/coursesSlice.ts";
// import { selectLessonCreating } from "./lessonsSlice.ts";
// import { fetchCourses } from "../courses/coursesThunks.ts";
// import TimeZone from "../../UI/TimeZone/TimeZone.tsx";
// import { toast } from "react-toastify";
// import Grid from "@mui/material/Grid2";

const AddNewLesson = () => {
  //   const dispatch = useAppDispatch();
  //   const navigate = useNavigate();
  //
  //   const [state, setState] = useState<LessonMutation>({
  //     course: "",
  //     title: "",
  //     timeZone: {
  //       value: "",
  //       label: "",
  //     },
  //     groupLevel: "",
  //     quantityClients: "",
  //     ageLimit: "",
  //     description: "",
  //     participants: [],
  //     presentUser: [],
  //   });
  //
  //   const [error, setError] = useState(false);
  //   const courses = useAppSelector(selectCourses);
  //   const loading = useAppSelector(selectLessonCreating);
  //   const coursesLoading = useAppSelector(selectCoursesFetching);
  //
  //   useEffect(() => {
  //     dispatch(fetchCourses())
  //       .unwrap()
  //       .catch(() => {
  //         toast.error("Ошибка при загрузке курсов. Повторите попытку.");
  //       });
  //   }, [dispatch]);
  //
  //   const submitFormHandler = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     if (
  //       !state.course ||
  //       !state.title.trim() ||
  //       !state.timeZone.value ||
  //       !state.groupLevel ||
  //       !state.quantityClients
  //     ) {
  //       setError(true);
  //       toast.error("Заполните все обязательные поля!");
  //       return;
  //     }
  //     try {
  //       await dispatch(createLesson(state)).unwrap();
  //       toast.success("Урок успешно создан!");
  //       navigate("/lessons");
  //     } catch (e) {
  //       toast.error("Ошибка при создании урока. Попробуйте снова.");
  //       console.error(e);
  //     }
  //   };
  //
  //   const inputChangeHandler = (
  //     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   ) => {
  //     const { name, value } = event.target;
  //     setState((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };
  //
  //   const courseChangeHandler = (event: SelectChangeEvent) => {
  //     setState((prevState) => ({
  //       ...prevState,
  //       course: event.target.value,
  //     }));
  //   };
  //
  //   const changeTimezone = (timezoneValue: string, timezoneLabel: string) => {
  //     setState((prevState) => ({
  //       ...prevState,
  //       timeZone: { value: timezoneValue, label: timezoneLabel },
  //     }));
  //   };
  //
  return (
    <></>
    //     <Container maxWidth="lg">
    //       <Grid
    //           container
    //           spacing={2}
    //           justifyContent="center"
    //           component="form"
    //           onSubmit={submitFormHandler}
    //           sx={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    //       >
    //         <Typography variant="h4" mb={3} textAlign="center">
    //           Добавьте новое занятие
    //         </Typography>
    //           {error && <Alert severity="error">Fill in all required fields!</Alert>}
    //           {coursesLoading && (
    //               <LoadingButton loading={true} fullWidth>
    //                 Loading...
    //               </LoadingButton>
    //           )}
    //           {!coursesLoading && courses.length === 0 && (
    //               <Alert severity="error">Courses are unavailable</Alert>
    //           )}
    //
    //           <Grid container spacing={2}>
    //             <Grid size={12}>
    //               <FormControl fullWidth>
    //                 <InputLabel>Course *</InputLabel>
    //                 <Select
    //                     value={state.course}
    //                     onChange={courseChangeHandler}
    //                     required
    //                     name="course"
    //                 >
    //                   <MenuItem value="" defaultChecked>
    //                     ****
    //                   </MenuItem>
    //                   {courses.map((course) => (
    //                       <MenuItem key={course._id} value={course._id}>
    //                         {course.title}
    //                       </MenuItem>
    //                   ))}
    //                 </Select>
    //               </FormControl>
    //             </Grid>
    //             <Grid size={12}>
    //               <TextField
    //                   required
    //                   label="Title"
    //                   name="title"
    //                   value={state.title}
    //                   onChange={inputChangeHandler}
    //                   fullWidth
    //               />
    //             </Grid>
    //
    //             <Grid size={12}>
    //               <TextField
    //                   required
    //                   label="Group Level"
    //                   type="number"
    //                   name="groupLevel"
    //                   value={state.groupLevel}
    //                   onChange={inputChangeHandler}
    //                   fullWidth
    //               />
    //             </Grid>
    //
    //             <Grid size={12}>
    //               <TextField
    //                   required
    //                   label="Quantity Clients"
    //                   type="number"
    //                   name="quantityClients"
    //                   value={state.quantityClients}
    //                   onChange={inputChangeHandler}
    //                   fullWidth
    //               />
    //             </Grid>
    //
    //             <Grid size={12}>
    //               <TextField
    //                   label="Age Limit"
    //                   type="number"
    //                   name="ageLimit"
    //                   value={state.ageLimit}
    //                   onChange={inputChangeHandler}
    //                   fullWidth
    //               />
    //             </Grid>
    //
    //             <Grid size={12}>
    //               <TextField
    //                   label="Description"
    //                   name="description"
    //                   value={state.description}
    //                   onChange={inputChangeHandler}
    //                   fullWidth
    //                   multiline
    //                   rows={3}
    //               />
    //             </Grid>
    //
    //             <Grid size={12}>
    //               <TimeZone
    //                   name="timeZone"
    //                   changeTimezone={changeTimezone}
    //                   value={state.timeZone}
    //               />
    //             </Grid>
    //           </Grid>
    //
    //           <LoadingButton
    //               loading={loading}
    //               type="submit"
    //               variant="contained"
    //               fullWidth
    //               sx={{ mt: 2 }}
    //           >
    //             Save
    //           </LoadingButton>
    //       </Grid>
    //     </Container>
  );
};

export default AddNewLesson;
