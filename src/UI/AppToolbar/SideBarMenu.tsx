import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/images/logo.png";
import { CustomStyledLink } from "./AnonymousMenu.tsx";
import { StyledLink } from "./AppToolbar.tsx";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import AddchartIcon from "@mui/icons-material/Addchart";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../../features/users/userThunk.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { apiURL } from "../../constants.ts";

interface Props {
  drawerOpen: boolean;
  closeDrawer: () => void;
}

const SideBarMenu: React.FC<Props> = ({ drawerOpen, closeDrawer }) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
    closeDrawer();
  };

  const navigateToProfile = () => {
    navigate(
      user?.role === "client"
        ? `/clients/${user?._id}`
        : `/trainers/${user?._id}`,
    );
    closeDrawer();
  };

  const navigateToCourses = () => {
    navigate(`/${user?.role}s/courses/${user?._id}`);
    closeDrawer();
  };

  const navigateToChats = () => {
    navigate(`/${user?.role}s/chats/${user?._id}`);
    closeDrawer();
  };

  const navigateToCreateGroup = () => {
    navigate(`/add-new-group`);
    closeDrawer();
  };

  const navigateToSearchCourses = () => {
    navigate(`/${user?.role}s/search-select/courses`);
    closeDrawer();
  };

  const navigateToSearchTrainers = () => {
    navigate(`/${user?.role}s/search-select/trainers`);
    closeDrawer();
  };

  const navigateToStatistics = () => {
    navigate(`/${user?.role}/statistics`);
    closeDrawer();
  };

  const navigateToLessons = () => {
    navigate("/lessons");
    closeDrawer();
  };

  const imageUrl = user?.avatar ? `${apiURL}/${user.avatar}` : undefined;

  return (
    <Drawer anchor="top" open={drawerOpen} onClose={closeDrawer}>
      <Box sx={{ width: "100%", backgroundColor: "black" }}>
        <Box sx={{ paddingY: 3, mr: 0 }}>
          <IconButton
            edge="end"
            size="small"
            onClick={closeDrawer}
            sx={{ position: "absolute", top: 8, right: 16, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack
          alignItems="center"
          spacing={2}
          width="100%"
          sx={{ backgroundColor: "white", padding: "40px" }}
        >
          <StyledLink to="/">
            <img src={logo} alt="Wings Fit Logo" style={{ height: 50 }} />
          </StyledLink>
          <Stack sx={{ paddingLeft: 2 }}>
            <CustomStyledLink onClick={navigateToProfile}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
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
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  {user?.firstName}
                </Typography>
              </Box>
            </CustomStyledLink>
            <CustomStyledLink onClick={navigateToCourses}>
              <FitnessCenterIcon sx={{ mr: 1, fontSize: "14px" }} />
              Мои курсы
            </CustomStyledLink>
            {user?.role === "trainer" && (
              <CustomStyledLink onClick={navigateToCreateGroup}>
                <GroupIcon sx={{ mr: 1, fontSize: "14px" }} />
                Создать группу
              </CustomStyledLink>
            )}
            <CustomStyledLink onClick={navigateToChats}>
              <ChatIcon sx={{ mr: 1, fontSize: "14px" }} />
              Чат
            </CustomStyledLink>
            {user?.role === "client" && (
              <CustomStyledLink onClick={navigateToSearchCourses}>
                <SearchIcon sx={{ mr: 1, fontSize: "14px" }} />
                Поиск занятий
              </CustomStyledLink>
            )}
            {user?.role === "client" && (
              <CustomStyledLink onClick={navigateToSearchTrainers}>
                <PersonSearchIcon sx={{ mr: 1, fontSize: "14px" }} />
                Поиск тренеров
              </CustomStyledLink>
            )}
            {user?.role === "trainer" && (
              <CustomStyledLink onClick={navigateToStatistics}>
                <AddchartIcon sx={{ mr: 1, fontSize: "14px" }} />
                Статистика
              </CustomStyledLink>
            )}
            {user?.role === "trainer" && (
              <CustomStyledLink onClick={navigateToLessons}>
                <EditNoteIcon sx={{ mr: 1, fontSize: "14px" }} />
                Занятия
              </CustomStyledLink>
            )}
            <CustomStyledLink onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1, fontSize: "14px" }} />
              Выход
            </CustomStyledLink>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SideBarMenu;
