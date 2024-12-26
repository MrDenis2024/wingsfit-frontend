import {
  Box,
  Container,
  Link,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import Grid from "@mui/material/Grid2";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

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
  const user = useAppSelector(selectUser);
  const userId = user?._id;
  const [showMenu, setShowMenu] = useState(false);

  const clientLinks = userId
    ? [
        { to: `/`, label: "Home" },
        { to: `/clients/courses/${userId}`, label: "My Courses" },
        { to: `/clients/chats/${userId}`, label: "My Chats" },
        { to: `/clients/search-select-page`, label: "Search" },
      ]
    : [];

  const trainerLinks = userId
    ? [
        { to: `/`, label: "Home" },
        { to: `/trainers/courses/${userId}`, label: "My Courses" },
        { to: `/trainers/chats/${userId}`, label: "My Chats" },
      ]
    : [];

  const links = user?.role === "trainer" ? trainerLinks : clientLinks;
  const isMobile = useMediaQuery("(max-width:600px)");

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
              sx={{ mb: 5, color: "#838383", maxWidth: 400 }}
            >
              Следите за нами в социальных сетях, мы будем рады обратной связи и
              вашим вопросам
            </Typography>
            <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#353535" }}>
                Lorem ipsum
              </Typography>
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
              <Typography variant="h6" color={"#000"}>
                Profiles
              </Typography>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Conversation
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Fitness Apps
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Premium
              </Link>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Typography variant="h6" color={"#000"}>
                Locations
              </Typography>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Interests
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Profile
              </Link>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Typography variant="h6" color={"#000"}>
                Chat
              </Typography>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Explore
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Fitness
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Fitness
              </Link>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Typography variant="h6" color={"#000"}>
                Stay connected
              </Typography>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Lorem ipsum
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Exerose
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Customer
              </Link>
            </Grid>
            <Grid display={"flex"} flexDirection={"column"} gap={"10px"}>
              <Typography variant="h6" color={"#000"}>
                Lorem
              </Typography>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Lorem
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Feedback
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ textDecoration: "none", color: "#757575" }}
              >
                Contact
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
              ) : link.label === "Search" ? (
                <SearchIcon />
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
                    width: 150,
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
                  <StyledLink to="/add-new-course">
                    <Typography variant="body1">Создать курс</Typography>
                  </StyledLink>
                  <StyledLink to="/add-new-group">
                    <Typography variant="body1">Создать группу</Typography>
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
