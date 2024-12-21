import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { apiURL, findCourseTypes } from "../../../constants.ts";
import { CourseTypeFields } from "../../../types/courseTypes.ts";
import {
  Box,
  CardMedia,
  Collapse,
  Container,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import HealingIcon from "@mui/icons-material/Healing";
import AvatarUploader from "../../../UI/Avatar/AvatarUploader.tsx";
import { IClient } from "../../../types/clientTypes.ts";

interface ClientsProfileDetailsProps {
  clientsProfile: IClient | null;
  id: string;
  isOwner: boolean;
}

const ClientProfileDetail: React.FC<ClientsProfileDetailsProps> = ({
  clientsProfile,
  id,
  isOwner,
}) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const courseTypes = useAppSelector(selectCourseTypes);
  const [open, setOpen] = useState(false);

  let cardImage = imageNotFound;

  if (clientsProfile && clientsProfile.user.avatar) {
    cardImage = `${apiURL}/${clientsProfile.user.avatar}`;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let preferredWorkoutType: CourseTypeFields[] = [];

  if (clientsProfile) {
    preferredWorkoutType = findCourseTypes(
      courseTypes,
      ...clientsProfile.preferredWorkoutType,
    );
  }

  const toggleStatus = () => setIsStatusOpen((prev) => !prev);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );

  return (
    clientsProfile && (
      <>
        <Box
          sx={{
            backgroundColor: "#dedfe3",
            paddingY: "25px",
          }}
        >
          <Container maxWidth="lg" sx={{ py: 5 }}>
            <Grid container>
              <Grid
                size={{ md: 4, sm: 6, xs: 12 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <CardMedia
                  component="img"
                  image={cardImage}
                  alt={`Фото профиля ${clientsProfile.user.firstName}`}
                  sx={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
                {isOwner && (
                  <IconButton
                    onClick={handleClickOpen}
                    sx={{
                      color: "#0288D1",
                      borderColor: "#0288D1",
                      "&:hover": {
                        backgroundColor: "#dff3fc",
                        borderColor: "#0288D1",
                      },
                    }}
                  >
                    <CameraAltIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid
                size={{ md: 7, sm: 6, xs: 12 }}
                justifyContent={{ xs: "center" }}
                sx={{
                  px: "15px",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-betwee+n"
                    alignItems="center"
                  >
                    <Typography
                      variant={isSmallScreen ? "h5" : "h4"}
                      sx={{ fontWeight: "bold", marginBottom: "10px" }}
                    >
                      {clientsProfile?.user.firstName}{" "}
                      {clientsProfile?.user.lastName}
                    </Typography>
                    {isOwner && (
                      <Link
                        to={`/edit-client/${id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <IconButton
                          sx={{
                            color: "#0288D1",
                            borderColor: "#0288D1",
                            "&:hover": {
                              backgroundColor: "#dff3fc",
                              borderColor: "#0288D1",
                            },
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                      </Link>
                    )}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "600", marginBottom: "10px" }}
                  >
                    Данные пользователя:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                  >
                    <LocalPhoneIcon />
                    {isSmallScreen ? <></> : <strong>Номер телефона:</strong>}
                    <span>{clientsProfile?.user.phoneNumber}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                  >
                    <CelebrationIcon />
                    {isSmallScreen ? <></> : <strong>Дата рождения:</strong>}
                    <span>
                      {clientsProfile?.user.dateOfBirth?.slice(0, 10) || "N/A"}
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                  >
                    {clientsProfile?.user.gender === "male" && <MaleIcon />}
                    {clientsProfile?.user.gender === "female" && <FemaleIcon />}
                    {clientsProfile?.user.gender === "other" && (
                      <TransgenderIcon />
                    )}
                    {isSmallScreen ? <></> : <strong>Пол:</strong>}
                    <span>{clientsProfile?.user.gender || "N/A"}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                  >
                    <SportsGymnasticsIcon />
                    {isSmallScreen ? <></> : <strong>Предпочитения:</strong>}
                    {preferredWorkoutType.map((type, index) => {
                      return (
                        <span key={type._id}>
                          {type.name}
                          {preferredWorkoutType.length - 1 > index ? ", " : ""}
                        </span>
                      );
                    })}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginBottom: "20px",
                    backgroundColor: "#dff3fc",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                    onClick={toggleStatus}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "600", marginBottom: "10px" }}
                    >
                      User Status
                    </Typography>
                    <IconButton>
                      {isStatusOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={isStatusOpen}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "16px",
                        marginBottom: "5px",
                      }}
                    >
                      <SchoolIcon />
                      {isSmallScreen ? (
                        <></>
                      ) : (
                        <strong>Уровень тренировоу:</strong>
                      )}
                      {clientsProfile?.trainingLevel}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "16px",
                        marginBottom: "5px",
                      }}
                    >
                      <HealingIcon />{" "}
                      {isSmallScreen ? (
                        <></>
                      ) : (
                        <strong>Физичкские данные:</strong>
                      )}
                      {clientsProfile?.physicalData}
                    </Typography>
                  </Collapse>
                </Box>

                <Box sx={{ textAlign: "start", marginBottom: "20px" }}>
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    Подписки
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#dff3fc",
                      padding: "15px",
                      borderRadius: "8px",
                      marginTop: "10px",
                    }}
                  >
                    {clientsProfile?.subscribes?.length === 0 ? (
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "12px", color: "#01579B" }}
                      >
                        Нет активных подписок на тренировки
                      </Typography>
                    ) : (
                      clientsProfile?.subscribes?.map((subscription) => (
                        <Link
                          key={subscription._id}
                          to={`/courses/${subscription._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "12px", color: "#01579B" }}
                          >
                            {subscription.title}
                          </Typography>
                        </Link>
                      ))
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <AvatarUploader
            trainerProfile={null}
            clientProfile={clientsProfile}
            open={open}
            onClose={handleClose}
          />
        </Box>
      </>
    )
  );
};

export default ClientProfileDetail;
