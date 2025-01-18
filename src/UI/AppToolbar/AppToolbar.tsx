import {
  AppBar,
  styled,
  Theme,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  Container,
  Box, Badge, Popover,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import logo from "../../assets/images/logo.png";
import { useAppSelector} from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import { useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarMenu from "./SideBarMenu.tsx";
import AdminNavigationBar from "./AdminNavigationBar.tsx";
import NotificationsIcon from '@mui/icons-material/Notifications';

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

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
              <Grid>
                <Badge color="secondary" onClick={handleClick} badgeContent={0} showZero>
                  <NotificationsIcon />
                </Badge>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                >
                  <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </Popover>
              </Grid>
              {!isSmallScreen && (
                  <Grid>
                    {user ? (
                        user.role === "admin" || user.role === "superAdmin" ? (
                            <AdminNavigationBar user={user} />
                        ) : (
                            <UserMenu user={user} />
                        )
                    ) : (
                        <AnonymousMenu />
                    )}
                  </Grid>
              )}
              {isSmallScreen && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
                    <MenuIcon />
                  </IconButton>
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
