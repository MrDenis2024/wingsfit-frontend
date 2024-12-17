import { NavLink } from "react-router-dom";
import BeRoleButton from "./components/buttons/BeRoleButton.tsx";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import welcomePic1 from "../../assets/images/welcome-pic1.jpeg";
import onlineWork from "../../assets/images/welcome-pic2.png";
import { AccessTime, Chat, Group, Wifi } from "@mui/icons-material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Grid from "@mui/material/Grid2";
import logo from "../../assets/images/logo.png";
import { StyledLink } from "../../UI/AppToolbar/AppToolbar.tsx";

const WelcomePage = () => {
  const mediaQuery768 = useMediaQuery("(min-width:768px)");
  const mediaQuery500 = useMediaQuery("(min-width:500px)");
  const mediaQuery950 = useMediaQuery("(min-width:950px)");

  return (
    <Grid container>
      <Container
        maxWidth="lg"
        sx={{
          mb: mediaQuery768 ? 9 : 3,
          px: mediaQuery768 ? "15px" : "0 !important",
        }}
      >
        <Grid
          display={"flex"}
          justifyContent={mediaQuery500 ? "start" : "center"}
          p={2}
        >
          <StyledLink to="/">
            <img src={logo} alt="Wings Fit Logo" style={{ height: 100 }} />
          </StyledLink>
        </Grid>
        <Grid
          size={12}
          sx={{
            backgroundImage: mediaQuery768 ? "none" : `url(${welcomePic1})`,
            backgroundSize: mediaQuery768 ? "none" : "cover",
            backgroundPosition: mediaQuery768 ? "none" : "center",
            display: "flex",
            color: "white",
            paddingX: 2,
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            position: "relative",
            "&::before": {
              content: "''",
              display: mediaQuery768 ? "none" : "block",
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
              left: "0",
              background: "rgba(0, 0, 0, 0.5)",
              mixBlendMode: "multiply",
            },
          }}
        >
          <Stack
            boxSizing={"border-box"}
            maxWidth="360px"
            justifyContent="center"
            position={"sticky"}
            paddingY="15px"
            zIndex={1}
          >
            <Typography
              sx={{
                fontSize: mediaQuery500 ? "42px" : "30px",
                lineHeight: "1.23",
                fontWeight: 600,
                padding: "24px 0 10px 0",
                color: mediaQuery768 ? "#000" : "#fff",
              }}
            >
              Тренировки по видео связи
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: mediaQuery768 ? "#535353" : "#fff",
                fontWeight: 400,
                lineHeight: "1.23",
                mb: 1,
              }}
            >
              Найди своего тренера или клиента
            </Typography>
            <Stack
              direction="row"
              gap={2}
              flexWrap="wrap"
              mt={3}
              alignItems="center"
            >
              <NavLink to="/login/trainer" style={{ textDecoration: "none" }}>
                <BeRoleButton text="Быть тренером!" />
              </NavLink>
              <NavLink to="/login/client" style={{ textDecoration: "none" }}>
                <BeRoleButton text="Хочу тренироваться!" />
              </NavLink>
            </Stack>
          </Stack>
          <Grid
            sx={{
              display: mediaQuery768 ? "block" : "none",
              maxWidth: "530px",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <img
              src={welcomePic1}
              alt="Training Devices"
              style={{
                maxWidth: "500px",
                width: "100%",
                height: "auto",
                borderRadius: "7px",
                position: mediaQuery950 ? "absolute" : "sticky",
                top: mediaQuery950 ? "20px" : "0",
              }}
            />
            <Grid
              sx={{
                backgroundColor: "#0cc5d6",
                height: "320px",
                maxWidth: "480px",
                width: "100%",
                borderRadius: "7px",
                ml: 6,
                display: mediaQuery950 ? "block" : "none",
              }}
            ></Grid>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontSize: mediaQuery500 ? "40px" : "30px",
            }}
          >
            Тренировки по видео связи это:
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { xs: "center", md: "center" },
            justifyContent: { md: "space-between" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Stack spacing={4} sx={{ maxWidth: "300px", width: "100%" }}>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="subtitle1" m={0} fontWeight={600}>
                  Формат видео звонка
                </Typography>
                <Typography variant="caption">
                  Тренировки не в записи вы тренируетесь в группе или
                  индивидуально в режиме видео звонка
                </Typography>
              </Box>
              <StarBorderIcon fontSize="large" />
            </Box>

            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Экономия времени
                </Typography>
                <Typography variant="caption">
                  Очевидно что занимаясь в удобном месте вы существенно
                  экономите время
                </Typography>
              </Box>
              <AccessTime fontSize="large" />
            </Box>

            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  В 5 раз эффективнее
                </Typography>
                <Typography variant="caption">
                  Статистически, тренировки по видео связи существенно
                  эффективнее тренировок в записи
                </Typography>
              </Box>
              <CardGiftcardIcon fontSize="large" />
            </Box>
          </Stack>

          <Box
            sx={{
              textAlign: "center",
              flexShrink: 0,
              maxWidth: { xs: "100%", md: "auto" },
              mt: { xs: 4, md: 0 },
            }}
          >
            <img
              src={onlineWork}
              alt="Training Devices"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          <Stack spacing={4} sx={{ maxWidth: "300px", width: "100%" }}>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Живое участие
                </Typography>
                <Typography variant="caption">
                  Благодаря формату вы всегда под контролем тренера и можете
                  общаться вживую
                </Typography>
              </Box>
              <Chat fontSize="large" />
            </Box>

            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Индивидуальный подход
                </Typography>
                <Typography variant="caption">
                  Небольшие группы позволяют адаптировать занятие под любого
                  участника
                </Typography>
              </Box>
              <Group fontSize="large" />
            </Box>

            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  График
                </Typography>
                <Typography variant="caption">
                  Гибкость онлайн формата позволит встроить фитнес в вашу жизнь
                </Typography>
              </Box>
              <Wifi fontSize="large" />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Grid>
  );
};

export default WelcomePage;
