import { Button, Grid2, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#212121",
  border: "1px solid #212121",
  borderRadius: theme.shape.borderRadius,
  fontSize: 12,
  fontWeight: 600,
  textTransform: "none",
  padding: `${theme.spacing(1)} ${theme.spacing(5)}`,
  minWidth: 200,
  "&:hover": {
    backgroundColor: "#fafafa",
    boxShadow: theme.shadows[2],
    transform: "scale(1.03)",
  },
}));

const Auth = () => {
  return (
    <>
      <Grid2 m={5}>
        <Grid2 display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
          <NavLink to="/register/client" style={{ textDecoration: "none" }}>
            <StyledButton variant="outlined">Want to work out</StyledButton>
          </NavLink>
          <NavLink to="/register/trainer" style={{ textDecoration: "none" }}>
            <StyledButton variant="outlined">Want to be a coach</StyledButton>
          </NavLink>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Auth;
