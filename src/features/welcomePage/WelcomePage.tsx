import { NavLink } from "react-router-dom";
import BeRoleButton from "./components/buttons/BeRoleButton.tsx";
import { Box, Stack, Typography } from "@mui/material";
import welcomePic1 from "../../assets/images/welcome-pic1.jpeg";
import TryFreeButton from "./components/buttons/TryFreeButton.tsx";
import onlineWork from "../../assets/images/welcome-pic2.png";
import yogaWork from "../../assets/images/welcome-pic3.jpeg";
import { AccessTime, Chat, Group, Wifi } from "@mui/icons-material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LanguageIcon from "@mui/icons-material/Language";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import TrainingCard from "./components/cards/TrainingCard.tsx";
import trainer1 from "../../assets/images/trainer-1.png";
import trainer2 from "../../assets/images/trainer-2.png";
import trainer3 from "../../assets/images/trainer-3.png";

const cards = [
  {
    id: 1,
    firstName: "Юлей",
    lastName: "Евсеевой",
    image: trainer3,
    date: "Вт. ЧЕТВ",
    time: "19:00",
    description:
      "Улучшаем гибкость и осанку, расслабляем мышцы и стремимся к шпагату",
  },
  {
    id: 2,
    firstName: "Аней",
    lastName: "Семянкиной",
    image: trainer2,
    date: "ПН. СР. ПЯТ",
    time: "8:30",
    description: "Просыпаемся и получаем заряд бодрости и энергии на весь день",
  },
  {
    id: 3,
    firstName: "Антоном",
    lastName: "Ширко",
    image: trainer1,
    date: "24 ИЮНЯ",
    time: "20:00",
    description:
      "Укрепляем основные мышечные группы. Для занятий понадобятся гантели или бутылки с водой",
  },
];

const WelcomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${welcomePic1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          color: "white",
          padding: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <Stack
          boxSizing={"border-box"}
          maxWidth="500px"
          position="absolute"
          top={"220px"}
          ml="20px"
        >
          <Typography
            sx={{
              fontSize: "32px",
              lineHeight: "1.23",
              fontWeight: 600,
              padding: "24px 0 38px 0",
              color: "#fff",
            }}
          >
            Фитнес тренировки по видео связи
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#fff",
              fontWeight: 600,
              lineHeight: "1.23",
              mb: 6,
            }}
          >
            Будь свободен. Тренируй и тренируйся
          </Typography>
          <Stack direction="row" gap={2} flexWrap="wrap" mt={3}>
            <NavLink to="/login/client" style={{ textDecoration: "none" }}>
              <BeRoleButton text="Быть тренером!" />
            </NavLink>
            <NavLink to="/login/trainer" style={{ textDecoration: "none" }}>
              <BeRoleButton text="Хочу тренироваться!"  />
            </NavLink>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ paddingY: "40px", paddingX: "20px", m: "20px" }}>
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Тренировки по видео связи это:
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { xs: "center", md: "flex-start" },
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
      </Box>
      <Box
        sx={{
          backgroundColor: "#0cc5d6",
          paddingY: "60px",
          textAlign: "center",
        }}
      >
        <NavLink to="/login/client" style={{ textDecoration: "none" }}>
          <TryFreeButton
            text="Попробовать бесплатно!"
            color="#000000"
            backgroundColor="transparent"
            border="3px solid #000000"
          />
        </NavLink>
      </Box>
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Box sx={{ marginX: "20px" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 6,
              lineHeight: "1.23",
              fontSize: {
                xs: "16px",
                sm: "24px",
                md: "32px",
                lg: "38px",
              },
            }}
          >
            Ты фитнес тренер? Или может преподаешь йогу, танцы, пилатес?
            Присоединяйся к команде WingsFit
          </Typography>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <LanguageIcon sx={{ fontSize: 50 }} />
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    Получи свободу
                  </Typography>
                  <Typography variant="caption">
                    Неограниченный заработок и удобный график работы
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <ChairOutlinedIcon sx={{ fontSize: 50 }} />
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    Удобная система для работы
                  </Typography>
                  <Typography variant="caption">
                    С помощью платформы WingsFit удобно управлять группами,
                    следить за оплатами, находить новых клиентов
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <FlightTakeoffIcon sx={{ fontSize: 50 }} />
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    Самостоятельность
                  </Typography>
                  <Typography variant="caption">
                    Пользуясь сервисом тебе не нужен ни менеджер, ни маркетолог
                    ни, тем более, начальник в клубе. Все заменяет система
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Box
              component="img"
              src={yogaWork}
              alt="Yoga Instructor"
              sx={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 2,
              }}
            />
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#0cc5d6",
          paddingY: "60px",
          textAlign: "center",
        }}
      >
        <NavLink to="/login/client" style={{ textDecoration: "none" }}>
          <TryFreeButton
            text="Попробовать бесплатно!"
            color="#000000"
            backgroundColor="transparent"
            border="3px solid #000000"
          />
        </NavLink>
      </Box>
      <Box sx={{ paddingY: "60px", marginX: "20px" }}>
        <Box sx={{ paddingX: "30px" }}>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Уже в WingsFit
          </Typography>
        </Box>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent={{ xs: "center", lg: "space-between" }}
          spacing={4}
          sx={{ padding: 4 }}
        >
          {cards.map((card) => (
            <TrainingCard
              key={card.id}
              firstName={card.firstName}
              lastName={card.lastName}
              image={card.image}
              date={card.date}
              time={card.time}
              description={card.description}
            />
          ))}
        </Stack>
      </Box>
      <Stack
        direction={"row"}
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
        sx={{ backgroundColor: "#0cc5d6", paddingY: "60px" }}
      >
        <NavLink to="/login/trainer" style={{ textDecoration: "none" }}>
          <TryFreeButton
            text="Стать тренером!"
            color="#000000"
            backgroundColor="#ffffff"
            border="1px solid #000000"
          />
        </NavLink>
        <NavLink to="/login/client" style={{ textDecoration: "none" }}>
          <TryFreeButton
            text="Попробовать тренировки!"
            color="#000000"
            backgroundColor="#ffffff"
            border="1px solid #000000"
          />
        </NavLink>
      </Stack>
    </Box>
  );
};

export default WelcomePage;
