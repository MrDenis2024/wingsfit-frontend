import {
  Box,
  Button,
  CardMedia,
  Container,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React, { useState } from "react";
import { ICourse } from "../../../types/courseTypes.ts";
import CourseCards from "../../courses/components/CourseCards.tsx";
import RatingAndReviews from "./RatingAndReviews.tsx";
import ReviewFormBlock from "../../reviewForm/components/ReviewFormBlock.tsx";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { apiURL } from "../../../constants.ts";
import NewAddTrainerCertificates from "../NewAddTrainerCertificates.tsx";
import { ITrainer } from "../../../types/trainerTypes.ts";
import { Link } from "react-router-dom";
import TrainerCertificates from "./TrainerCertificates.tsx";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AvatarUploader from "../../../UI/Avatar/AvatarUploader.tsx";

interface TrainerProfileDetailsProps {
  trainerProfile: ITrainer | null;
  courses: ICourse[];
  isOwner: boolean;
  id: string;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  handleReviewSubmit: (reviewText: string, ratingValue: number | null) => void;
}

const TrainerProfileDetails: React.FC<TrainerProfileDetailsProps> = ({
  trainerProfile,
  courses,
  isOwner,
  id,
  showForm,
  setShowForm,
  handleReviewSubmit,
}) => {
  const [open, setOpen] = useState(false);

  let cardImage = imageNotFound;

  if (trainerProfile && trainerProfile.user.avatar) {
    cardImage = `${apiURL}/${trainerProfile.user.avatar}`;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );

  return (
    <>
      <Box sx={{ backgroundColor: "#dedfe3", paddingY: "25px" }}>
        <Container
          maxWidth="lg"
          sx={{
            my: 5,
          }}
        >
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
                alt={`Фото тренера ${trainerProfile?.user.firstName}`}
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
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant={isSmallScreen ? "h5" : "h4"}
                    sx={{ fontWeight: "bold" }}
                  >
                    {trainerProfile?.user.firstName}{" "}
                    {trainerProfile?.user.lastName}
                  </Typography>
                  {isOwner && (
                    <Link
                      to={`/edit-trainer/${id}`}
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
                  <span>{trainerProfile?.user.phoneNumber || "N/A"}</span>
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
                  {isSmallScreen ? <></> : <strong>Дата рождения: </strong>}
                  <span>
                    {trainerProfile?.user.dateOfBirth.slice(0, 10) || "N/A"}
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
                  {trainerProfile?.user.gender === "male" && <MaleIcon />}
                  {trainerProfile?.user.gender === "female" && <FemaleIcon />}
                  {trainerProfile?.user.gender === "other" && (
                    <TransgenderIcon />
                  )}
                  {isSmallScreen ? <></> : <strong>Пол:</strong>}{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {trainerProfile?.user.gender || "N/A"}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px" }}
                >
                  <FitnessCenterIcon />
                  {isSmallScreen ? <></> : <strong>Специализация:</strong>}{" "}
                  {trainerProfile?.specialization || "Специализация не указана"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px" }}
                >
                  <AutoAwesomeIcon />
                  {isSmallScreen ? <> </> : <strong>Опыт: </strong>}
                  {trainerProfile?.experience || "Опыт не указан"}
                </Typography>

                <TrainerCertificates trainerProfile={trainerProfile} />

                {isOwner && <NewAddTrainerCertificates />}
                {!isOwner && (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: "fit-content" }}
                  >
                    Связаться с тренером
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#e3f3fc", paddingY: "20px" }}>
        <Container maxWidth="lg">
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", lineHeight: "1.6" }}
          >
            {trainerProfile?.description || "Описание не заполнено"}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container direction="column">
          <Grid size={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 5 }}>
              Доступные курсы
            </Typography>
            <CourseCards courses={courses} />
          </Grid>
          <Grid size={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold", my: 3 }}>
              Отзывы
            </Typography>
          </Grid>
          <Grid size={12}>
            <RatingAndReviews id={id} />
          </Grid>

          <Box sx={{ marginTop: "40px" }}>
            {!isOwner && (
              <>
                <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowForm(!showForm)}
                    sx={{
                      color: "black",
                      borderColor: "black",
                      borderRadius: "7px",
                    }}
                  >
                    {showForm ? "Закрыть" : "Оставить отзыв"}
                  </Button>
                </Box>
                {showForm && (
                  <Box
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <ReviewFormBlock onSubmit={handleReviewSubmit} />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Grid>
        <AvatarUploader
          trainerProfile={trainerProfile}
          clientProfile={null}
          open={open}
          onClose={handleClose}
        />
      </Container>
    </>
  );
};

export default TrainerProfileDetails;
