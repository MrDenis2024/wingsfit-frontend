import { Box, Stack, TextField, Typography } from "@mui/material";
import logoImage from "../../assets/images/logo.png";
import Grid from "@mui/material/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginAdmin = ()=>{
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
                        // onSubmit={submitFormHandler}
                        sx={{ mt: 3, width: "100%", mx: "auto" }}
                    >
                        <Grid container direction="column" spacing={2}>
                        {/* {error && (
                            <Alert severity="error" sx={{ mt: 3 }}>
                            {error.error}
                            </Alert>
                        )} */}
                        <Grid>
                            <TextField
                            required
                            type="text"
                            label="UserName"
                            name="userName"
                            // value={state.email}
                            // onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                            required
                            type="password"
                            label="Password"
                            name="password"
                            autoComplete="new-password"
                            // value={state.password}
                            // onChange={inputChangeHandler}
                            />
                        </Grid>
                        </Grid>
                        <LoadingButton
                        type="submit"
                        fullWidth
                        variant="outlined"
                        // loading={loading}
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Get Started
                        </LoadingButton>
                    </Box>
                    </Box>
                </Stack>
            </Stack>
        </>
    )
};

export default LoginAdmin;