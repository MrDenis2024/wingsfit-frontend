import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid2";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useState } from "react";

const LessonForm = ()=>{

    const Textarea = styled(BaseTextareaAutosize)({
        color: 'currentColor',
        font: 'inherit',
        fontFamily: "Roboto, Helvetica Arial, sans-serif",
        fontSize: '16px',
        border: '1px solid grey',
        borderRadius: '5px',
        fontWeight: '400',
        boxSizing: 'border-box',
        width: '100%',
        padding: '16px 14px',
        boxShadow: 'none',
        outline: 'none',
        '&:focus': {
            border: '2px solid #1976d2',
        },
    });

    const [course, setCourse] = useState('');

    const courseChange = (event: SelectChangeEvent) => {
        setCourse(event.target.value as string);
    };
    return(
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
          <Typography component="h1" variant="h4" gutterBottom>
            Add new Lesson
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={submitFormHandler}
            sx={{ mt: 3, width: "100%", mx: "auto" }}
          >
              <Grid container direction="column" spacing={2}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Course</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={course}
                    label="Course"
                    onChange={courseChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <Grid>
                    <TextField
                    required
                    type="text"
                    label="Title"
                    name="title"
                    //   value={state.email}
                    //   onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid>
                    <TextField
                    required
                    type="text"
                    label="Time Zone"
                    name="timeZone"
                    //   value={state.email}
                    //   onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid>
                <TextField
                  required
                  type="text"
                  label="Group Level"
                  name="groupLevel"
                  //   value={state.email}
                  //   onChange={inputChangeHandler}
                  />
              </Grid>
              <Grid>
                <TextField
                  required
                  type="numder"
                  label="Age Limit"
                  name="ageLimit"
                  //   value={state.password}
                  //   onChange={inputChangeHandler}
                  />
              </Grid>
              <Grid>
              <Textarea minRows={1} placeholder="Minimum 3 rows"/> 
              </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="outlined"
              //   loading={loading}
              >
              Save
            </LoadingButton>
                </Grid>
          </Box>
        </Box>
      </Stack>
    </Stack>        
        </>
    )
}

export default LessonForm;
