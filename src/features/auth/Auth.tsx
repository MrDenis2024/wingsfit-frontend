import {Box, Button, Grid2, styled, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import welcomePicture from "../../assets/images/welcome-picture.jpeg";

const StyledButton = styled(Button)(({theme}) => ({
  color: "#212121",
  border: "1px solid #212121",
  borderRadius: "14px",
  fontSize: 12,
  fontWeight: 600,
  textTransform: "none",
  padding: `${theme.spacing(1)} ${theme.spacing(5)}`,
  minWidth: 355,
  "&:hover": {
    backgroundColor: "#fafafa",
    boxShadow: theme.shadows[2],
    transform: "scale(1.03)",
  },
}));

const Auth = () => {
  return (
    <>
      <Grid2 flexDirection="column" container my={10} py={2} justifyContent="center" alignItems="center">
        <Grid2
          sx={{
            width: 345,
            borderBottom: "2px solid",
            borderTop: "2px solid",
            borderColor: "rgba(228,228,228,0.7)",
            my: 3,
            px: 7,
            py: 1,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h2" fontWeight="bold" gutterBottom>
            WingsFit
          </Typography>
        </Grid2>
        <Grid2
          sx={{
            width: 270,
            my: 1,
            py: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" lineHeight="1.3" fontWeight="bold" textAlign="center" gutterBottom>
            Connect with fitness trainers for group sessions
          </Typography>
        </Grid2>
          <Box
            component="img"
            src={welcomePicture}
            alt="Welcome"
            sx={{ width: "auto", height: 250, mb: 2 }}
          />
        <Grid2 size={12} py={2} display="flex" flexDirection="column" alignItems="center"
               justifyContent="center" flexWrap="wrap" gap={1}>
          <NavLink to="/login/client" style={{textDecoration: "none"}}>
            <StyledButton variant="outlined">Want to work out</StyledButton>
          </NavLink>
          <NavLink to="/login/trainer" style={{textDecoration: "none"}}>
            <StyledButton variant="outlined">Want to be a coach</StyledButton>
          </NavLink>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Auth;
