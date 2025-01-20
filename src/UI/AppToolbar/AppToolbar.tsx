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
  Badge,
  Popover,
  List,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import logo from "../../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarMenu from "./SideBarMenu.tsx";
import AdminNavigationBar from "./AdminNavigationBar.tsx";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notification from "../../features/notification/component/Notification.tsx";
import {
  selectCoursesToday,
  selectEndedSubscriptions,
  selectNotificationLoading,
  selectStartedLessons,
  selectUnreadMessages,
} from "../../features/notification/notificationSlice.ts";
import {
  getCoursesToday,
  getEndedSubscription,
  getStartedLessons,
  getUnreadMessages,
} from "../../features/notification/notificationThunk.ts";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator.tsx";

export const StyledLink = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const dispath = useAppDispatch();
  const messages = useAppSelector(selectUnreadMessages);
  const notificationLoading = useAppSelector(selectNotificationLoading);
  const coursesToday = useAppSelector(selectCoursesToday);
  const endedSubscriptions = useAppSelector(selectEndedSubscriptions);
  const startedLessons = useAppSelector(selectStartedLessons);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );

  useEffect(() => {
    dispath(getUnreadMessages());
    dispath(getEndedSubscription());
    dispath(getCoursesToday());
    dispath(getStartedLessons());
  }, [dispath]);

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
  const id = open ? "simple-popover" : undefined;

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
              <Grid sx={{ ml: "auto", mr: 3 }}>
                <Badge
                  color="secondary"
                  onClick={handleClick}
                  badgeContent={
                    messages.length +
                    coursesToday.length +
                    endedSubscriptions.length +
                    startedLessons.length
                  }
                  showZero
                >
                  <NotificationsIcon />
                </Badge>
                <Popover
                  id={id}
                  open={open}
                  aria-hidden={!open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {messages.map((message) => {
                      return (
                        <Notification key={message._id} message={message} />
                      );
                    })}
                    {coursesToday.map((courseToday) => {
                      return (
                        <Notification
                          key={courseToday.group._id}
                          courseToday={courseToday}
                        />
                      );
                    })}
                    {endedSubscriptions.map((endedSubscription, index) => {
                      return (
                        <Notification
                          key={endedSubscription.courseId + index.toString()}
                          endedSubscription={endedSubscription}
                        />
                      );
                    })}
                    {startedLessons.map((startedLesson) => {
                      return (
                        <Notification
                          key={startedLesson._id}
                          lesson={startedLesson}
                        />
                      );
                    })}
                    {notificationLoading ? (
                      <Grid sx={{ mb: 3 }}>
                        <LoadingIndicator />
                      </Grid>
                    ) : null}
                  </List>
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
