import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";

const StyledLink = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }} color="inherit">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/">Wings Fit</StyledLink>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
