import React, { useState } from "react";
import { Box, Stack, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { register } from "./userThunk";
import logoImage from "../../assets/images/logo.png";
import Grid from "@mui/material/Grid2";
import { selectRegisterError, selectRegisterLoading } from "./userSlice.ts";
import { UserMutation } from "../../types/userTypes.ts";
import LoadingButton from "@mui/lab/LoadingButton";

const Register = () => {
  const { role } = useParams() as { role: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const [state, setState] = useState<UserMutation>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userMutation = {
        email: state.email.trim().toLowerCase(),
        password: state.password.trim(),
        confirmPassword: state.confirmPassword.trim(),
      };

      await dispatch(register({ userMutation, role })).unwrap();
      navigate(`/fill-profile/${role}`);
    } catch (e) {
      console.error(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  return (
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
            Join us for fitness fun!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitFormHandler}
            sx={{ mt: 3, width: "100%", mx: "auto" }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid>
                <TextField
                  required
                  type="email"
                  label="Gmail"
                  name="email"
                  autoComplete="new-username"
                  value={state.email}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError("email"))}
                  helperText={getFieldError("email")}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type="password"
                  label="Password"
                  name="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError("password"))}
                  helperText={getFieldError("password")}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={state.confirmPassword}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError("confirmPassword"))}
                  helperText={getFieldError("confirmPassword")}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Get Started
            </LoadingButton>
            <Typography variant="body1">
              New to FitConnect?{" "}
              <Link component={RouterLink} to={`/login/${role}`}>
                Sign
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Register;
