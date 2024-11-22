import {styled, Typography, Box, Stack, Link} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
import logo from "../../assets/images/logo.png";
import { selectUser } from "../../features/users/userSlice.ts";
import {Telegram} from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';

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
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          py: 10,
          px: { xs: 2, sm: 4 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography variant="h5" gutterBottom mb={5}>
          Контакты
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 5, color: "#cccccc", maxWidth: 400 }}
        >
          Следите за нами в социальных сетях, мы будем рады обратной связи и
          вашим вопросам
        </Typography>
        <Stack
          direction="column"
          spacing={1}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2" sx={{ color: "#757575" }}>
            E-mail:{" "}
            <Link
              href="mailto:hello@madeontilda.com"
              color="inherit"
              sx={{ textDecoration: "none", color: "#757575" }}
            >
              hello@madeontilda.com
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: "#757575" }}>
            Телефон:{" "}
            <Link
              href="tel:+11234567890"
              sx={{ textDecoration: "none", color: "#757575" }}
            >
              +1 123 456 78 90
            </Link>
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          spacing={2}
        >
          <Link href="#" color="inherit">
            <XIcon fontSize="small" sx={{ color: "#e53935" }} />
          </Link>
          <Link href="#" color="inherit">
            <Telegram fontSize="small" sx={{ color: "#e53935" }} />
          </Link>
        </Stack>
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
