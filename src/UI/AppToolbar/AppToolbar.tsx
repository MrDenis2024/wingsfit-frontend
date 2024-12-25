import {
  AppBar,
  styled,
  Theme,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  Container,
  Box,
  Avatar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import logo from "../../assets/images/logo.png";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarMenu from "./SideBarMenu.tsx";
import { apiURL } from "../../constants.ts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

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
  const imageUrl = user?.avatar ? `${apiURL}/${user.avatar}` : undefined;

  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <Container maxWidth="lg">
            <Grid
              sx={{ width: "100%" }}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  <StyledLink to="/">
                    <img
                      src={logo}
                      alt="Wings Fit Logo"
                      style={{ height: 50 }}
                    />
                  </StyledLink>
                </Typography>
              </Grid>
              {!isSmallScreen && (
                <Grid>
                  {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                </Grid>
              )}
              {isSmallScreen && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
                    <MenuIcon />
                  </IconButton>

                  {user && (
                    <StyledLink
                      to={
                        user.role === "client"
                          ? `/clients/${user._id}`
                          : `/trainers/${user._id}`
                      }
                      style={{
                        marginLeft: 16,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {imageUrl ? (
                        <Avatar
                          src={imageUrl}
                          alt="User Avatar"
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <AccountBoxIcon sx={{ fontSize: 30 }} />
                      )}
                    </StyledLink>
                  )}
                </Box>
              )}
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <SideBarMenu drawerOpen={drawerOpen} closeDrawer={closeDrawer} />
    </>
  );
};

export default AppToolbar;
