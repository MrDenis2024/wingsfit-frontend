import { styled, Typography, Box, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/userSlice.ts";

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
        { to: `/client/${userId}`, label: "My Profile" },
        { to: `/client/courses/${userId}`, label: "My Courses" },
        { to: `/client/chats/${userId}`, label: "My Chats" },
        { to: `/client/calendar/${userId}`, label: "Calendar" },
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
          <StyledLink to="/main" end>
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
