import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import logo from "../../assets/images/logo.png";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import UserMenu from "./UserMenu.tsx";

const StyledLink = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }} color="inherit">
      <Toolbar>
        <Grid
          sx={{ width: "100%" }}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/">
                <img src={logo} alt="Wings Fit Logo" style={{ height: 50 }} />
              </StyledLink>
            </Typography>
          </Grid>
          <Grid>{user && <UserMenu user={user} />}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
