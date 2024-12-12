import {
  AppBar,
  styled,
  Theme,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import logo from "../../assets/images/logo.png";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import {useEffect, useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarMenu from "./SideBarMenu.tsx";

export const StyledLink = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  useEffect(() => {
    console.log(user)
  }, [user]);
  return (
    <>
      <AppBar position="sticky" color="inherit">
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
            {!isSmallScreen && (
              <Grid>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Grid>
            )}

            {isSmallScreen && (
              <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <SideBarMenu drawerOpen={drawerOpen} closeDrawer={closeDrawer} />
    </>
  );
};

export default AppToolbar;
