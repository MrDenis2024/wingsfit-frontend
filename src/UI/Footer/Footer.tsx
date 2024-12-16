import {
  styled,
  Typography,
  Box,
  Stack,
  Link,
  Container,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
import logo from "../../assets/images/logo.png";
import { selectUser } from "../../features/users/userSlice.ts";
import Grid from "@mui/material/Grid2";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const currentYear = new Date().getFullYear();
  const user = useAppSelector(selectUser);
  const userId = user?._id;

  const clientLinks = userId
    ? [
        { to: `/clients/${userId}`, label: "My Profile" },
        { to: `/clients/courses/${userId}`, label: "My Courses" },
        { to: `/clients/chats/${userId}`, label: "My Chats" },
        { to: `/clients/calendar/${userId}`, label: "Calendar" },
      ]
    : [];

  const trainerLinks = userId
    ? [
        { to: `/trainers/${userId}`, label: "My Profile" },
        { to: `/trainers/courses/${userId}`, label: "My Courses" },
        { to: `/trainers/chats/${userId}`, label: "My Chats" },
        { to: `/trainers/calendar/${userId}`, label: "Calendar" },
      ]
    : [];

  const links = user?.role === "trainer" ? trainerLinks : clientLinks;

  if (location.pathname === "/") {
    return (
      <Box
        component="footer"
        id="footer"
        sx={{
          color: "#fff",
          py: 4,
          px: { xs: 2, sm: 4 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: useMediaQuery("(min-width:1162px)")
              ? "space-between"
              : "center",
            flexWrap: "wrap",
          }}
        >
          <Grid
            textAlign={useMediaQuery("(min-width:1162px)") ? "left" : "center"}
          >
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
              <Grid
                display={"flex"}
                justifyContent={
                  useMediaQuery("(min-width:1162px)") ? "left" : "center"
                }
                gap={"7px"}
              >
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
    );
  }

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        bgcolor: "background.default",
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          fontSize: "1rem",
          fontWeight: "500",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledLink to="/" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            <img
              src={logo}
              alt="Wings Fit Logo"
              style={{ height: 40, marginRight: 10 }}
            />
          </StyledLink>
        </Box>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ alignItems: "center" }}
        >
          <StyledLink to="/" end>
            Home
          </StyledLink>
          {links.map((link) => (
            <StyledLink key={link.to} to={link.to}>
              {link.label}
            </StyledLink>
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          &copy; {currentYear} Wings Fit.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
