import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Location, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import Grid from "@mui/material/Grid2";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const StyledLink = styled(NavLink)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "500",
  "&.active": {
    color: theme.palette.primary.main,
  },
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Footer = () => {
  const location: Location = useLocation();
  const user = useAppSelector(selectUser);
  const userId = user?._id;
  const [showMenu, setShowMenu] = useState(false);

  const clientLinks = userId
    ? [
        { to: `/`, label: "Home" },
        { to: `/clients/chats/${userId}`, label: "My Chats" },
        { to: `/clients/search-select/courses`, label: "Search courses" },
        { to: `/clients/search-select/trainers`, label: "Search trainers" },
      ]
    : [];

  const trainerLinks = userId
    ? [
        { to: `/`, label: "Home" },
        { to: `/trainers/courses/${userId}`, label: "My Courses" },
        { to: `/trainers/chats/${userId}`, label: "My Chats" },
        { to: `/trainer/groups`, label: "My Groups" },
      ]
    : [];

  const links = user?.role === "trainer" ? trainerLinks : clientLinks;
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Box
        component="footer"
        id="footer"
        sx={{
          color: "#fff",
          mt: 6,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Grid
          size={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          sx={{ backgroundColor: "#0cc5d6", paddingY: "60px" }}
        ></Grid>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            pt: 4,
            "@media (max-width: 600px)": {
              pb: 10,
            },
          }}
        >
          <Grid textAlign="left">
            <Typography variant="h4" fontWeight={"700"} mb={1} color={"#000"}>
              WingsFit
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 2, color: "#838383", maxWidth: 400 }}
            >
              Следите за нами в социальных сетях, мы будем рады обратной связи и
              вашим вопросам
            </Typography>
            <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
              <Grid display={"flex"} justifyContent="left" gap={"7px"}>
                <FitnessCenterIcon sx={{ color: "#000" }} />
                <DirectionsRunIcon sx={{ color: "#000" }} />
                <FavoriteIcon sx={{ color: "#000" }} />
              </Grid>
            </Stack>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            gap={"50px"}
          >
            <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Link
                href="https://wingsfit.online/about"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  color: "#757575",
                  "&:hover": {
                    color: "#000",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                О Wings Fit
              </Link>
              <Link
                href="https://wingsfit.online/pp-recepty"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  color: "#757575",
                  "&:hover": {
                    color: "#000",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                Рецепты
              </Link>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Link
                href="https://wingsfit.online/faq"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  color: "#757575",
                  "&:hover": {
                    color: "#000",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                FAQ
              </Link>
              <Link
                href="https://wingsfit.online/fortrainers"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  color: "#757575",
                  "&:hover": {
                    color: "#000",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                Тренеру
              </Link>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Link
                href="https://wingsfit.online/blog"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  color: "#757575",
                  "&:hover": {
                    color: "#000",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                Блог
              </Link>
              <Link
                href="https://wingsfit.online/contacts"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  color: "#757575",
                  "&:hover": {
                    color: "#000",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                Контакты
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {isMobile && user && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: "background.default",
            boxShadow: "0px -6px 12px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 3,
            paddingY: 2,
            borderRadius: "20px 20px 0 0",
            borderTop: "2px solid",
            borderColor: "background.paper",
          }}
        >
          {links.map((link) => (
            <StyledLink key={link.to} to={link.to}>
              {link.label === "Home" ? (
                <HomeIcon />
              ) : link.label === "My Courses" ? (
                <FitnessCenterIcon />
              ) : link.label === "My Chats" ? (
                <ChatIcon />
              ) : link.label === "My Groups" ? (
                <GroupIcon />
              ) : link.label === "Search courses" ? (
                <SearchIcon />
              ) : link.label === "Search trainers" ? (
                <PersonSearchIcon />
              ) : null}
            </StyledLink>
          ))}
          {user?.role === "trainer" && (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <AddCircleOutlineIcon />
              </Box>
              {showMenu && (
                <Box
                  sx={{
                    width: 170,
                    position: "absolute",
                    bottom: 70,
                    right: 5,
                    backgroundColor: "background.paper",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: 1,
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <StyledLink
                    to="/add-new-course"
                    onClick={() => setShowMenu(false)}
                  >
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      Создать курс <FitnessCenterIcon />
                    </Typography>
                  </StyledLink>
                  <Divider />
                  <StyledLink
                    to="/add-new-group"
                    onClick={() => setShowMenu(false)}
                  >
                    <Typography
                      variant="body1"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      Создать группу <GroupAddIcon />
                    </Typography>
                  </StyledLink>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Footer;
