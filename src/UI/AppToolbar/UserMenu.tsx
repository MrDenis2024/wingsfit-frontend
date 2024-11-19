import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { IUser } from "../../types/userTypes.ts";
import { apiURL } from "../../constants.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { logout } from "../../features/users/userThunk.ts";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const imageUrl = user.avatar ? `${apiURL}/${user.avatar}` : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const handleProfileClick = () => {
    const profilePath =
      user.role === "client" ? `/clients/${user._id}` : `/trainers/${user._id}`;
    navigate(profilePath);
    handleClose();
  };

  return (
    <Grid>
      <Stack direction="row" alignItems="center">
        <IconButton
          sx={{ display: "flex", gap: 1 }}
          disableRipple
          onClick={handleClick}
        >
          <Typography fontSize="18px" color="black">
            {user.firstName}
          </Typography>{" "}
          <Avatar
            alt="avatar"
            src={imageUrl}
            sx={{ width: 24, height: 24, display: "inline-block" }}
          />
        </IconButton>
      </Stack>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleProfileClick}>
          <AccountBoxIcon sx={{ mr: 2 }} />
          My profile
        </MenuItem>
        <MenuItem
          onClick={() => navigate(`/${user.role}s/courses/${user._id}`)}
        >
          <FitnessCenterIcon sx={{ mr: 2 }} />
          My Courses
        </MenuItem>
        <MenuItem onClick={() => navigate(`/${user.role}s/chats/${user._id}`)}>
          <ChatIcon sx={{ mr: 2 }} />
          My Chats
        </MenuItem>
        <MenuItem
          onClick={() => navigate(`/${user.role}/calendars/${user._id}`)}
        >
          <CalendarMonthIcon sx={{ mr: 2 }} />
          Calendar
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;