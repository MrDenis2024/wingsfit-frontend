import React, { useState } from "react";
import { Box, Stack, TextField, Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import logoImage from "../../assets/images/logo.png";
import Grid from "@mui/material/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googleLogin, login } from "./userThunk";
import { selectLoginError, selectLoginLoading } from "./userSlice";

const Login = () => {
  const { role } = useParams() as { role: string };
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        await dispatch(
          googleLogin({
            credential: credentialResponse.credential,
            role: role,
          }),
        ).unwrap();
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userMutation = {
        email: state.email.trim().toLowerCase(),
        password: state.password.trim(),
      };

      await dispatch(login(userMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
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
              {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                  {error.error}
                </Alert>
              )}
              <Grid>
                <GoogleLogin
                  onSuccess={googleLoginHandler}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type="email"
                  label="Gmail"
                  name="email"
                  autoComplete="new-username"
                  value={state.email}
                  onChange={inputChangeHandler}
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
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="outlined"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Get Started
            </LoadingButton>
            <Typography variant="body1">
              New to FitConnect?{" "}
              <Link component={RouterLink} to={`/register/${role}`}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Login;
