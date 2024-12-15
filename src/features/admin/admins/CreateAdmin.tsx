import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectAdminCreatError,
  selectAdminCreatLoading,
} from "./adminSlice.ts";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import { AdminMutation } from "../../../types/adminTypes.ts";
import { createAdmin } from "./adminThunks.ts";
import { Alert, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreatingAdmin = useAppSelector(selectAdminCreatLoading);
  const isCreatingError = useAppSelector(selectAdminCreatError);
  const [admin, setAdmin] = useState<AdminMutation>({
    userName: "",
    password: "",
  });

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createAdmin(admin)).unwrap();
      navigate("/main");
    } catch (e) {
      console.error(e);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography variant="h4" sx={{ my: 2, textAlign: "center" }}>
        Create new admin
      </Typography>
      <Grid
        container
        direction="column"
        spacing={2}
        component="form"
        noValidate
        onSubmit={onFormSubmit}
      >
        {isCreatingError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {isCreatingError.error}
          </Alert>
        )}
        <Grid>
          <TextField
            required
            type="text"
            label="User name"
            name="userName"
            value={admin.userName}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid>
          <TextField
            required
            type="password"
            label="Password"
            name="password"
            value={admin.password}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid container justifyContent="flex-end">
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isCreatingAdmin}
          >
            Save admin
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateAdmin;
