import {
  Box,
  Button,
  CardMedia,
  Container,
  Dialog,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React, { useEffect, useState } from "react";
import { ICourse } from "../../../types/courseTypes.ts";
import CourseCards from "../../courses/components/CourseCards.tsx";
import RatingAndReviews from "./RatingAndReviews.tsx";
import ReviewFormBlock from "../../reviewForm/components/ReviewFormBlock.tsx";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hooks.ts";
import { fetchUpdateAvatarTrainer } from "../trainersThunks.ts";
import { apiURL } from "../../../constants.ts";
import NewAddTrainerCertificates from "../NewAddTrainerCertificates.tsx";
import { ITrainer } from "../../../types/trainerTypes.ts";
import { Link } from "react-router-dom";
import TrainerCertificates from "./TrainerCertificates.tsx";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import { reloadUser } from "../../users/userThunk.ts";

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
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState(imageNotFound);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  let cardImage = imageNotFound;

  if (trainerProfile && trainerProfile.user.avatar) {
    cardImage = `${apiURL}/${trainerProfile.user.avatar}`;
  }

  useEffect(() => {
    if (trainerProfile?.user.avatar) {
      setAvatarImage(`${apiURL}/${trainerProfile.user.avatar}`);
    }
  }, [trainerProfile]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAvatarImage(cardImage);
    setSelectedAvatar(null);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Можно загружать только изображения!");
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        toast.error("Размер файла не должен превышать 4 МБ!");
        return;
      }
      setSelectedAvatar(file);
      const objectUrl = URL.createObjectURL(file);
      setAvatarImage(objectUrl);
    }
  };

  const handleAvatarSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedAvatar) return;

    try {
      await dispatch(fetchUpdateAvatarTrainer(selectedAvatar)).unwrap();
      await dispatch(reloadUser());
      toast("Avatar updated successfully");
      setSelectedAvatar(null);
      handleClose();
    } catch (err) {
      console.error("Failed to update avatar:", err);
      toast("Failed to update avatar");
    }
  };

  const handleDeleteAvatarConfirm = async () => {
    try {
      await dispatch(fetchUpdateAvatarTrainer(null)).unwrap();
      toast("Avatar deleted successfully");
      await dispatch(reloadUser());
      setAvatarImage(imageNotFound);
    } catch (err) {
      console.error("Failed to delete avatar:", err);
      toast("Failed to delete avatar");
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleDeleteAvatar = () => {
    setConfirmOpen(true);
  };
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
                <Button
                  onClick={handleClickOpen}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  Изменить аватарку
                  <CameraAltIcon sx={{ marginLeft: 1 }} />
                </Button>
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
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {trainerProfile?.user.firstName}{" "}
                  {trainerProfile?.user.lastName}
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
                  <strong>Номер телефона:</strong>{" "}
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
                  <strong>Дата рождения: </strong>
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
                  <strong>Пол:</strong>{" "}
                  <span>{trainerProfile?.user.gender || "N/A"}</span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <FitnessCenterIcon />
                  <strong>Specialization:</strong>{" "}
                  {trainerProfile?.specialization || "Специализация не указана"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <AutoAwesomeIcon />
                  <strong>Опыт:</strong>{" "}
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
                {isOwner && (
                  <Link
                    to={`/edit-trainer/${id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        width: "fit-content",
                        color: "#0288D1",
                        borderColor: "#0288D1",
                        borderRadius: "7px",
                        "&:hover": {
                          backgroundColor: "#dff3fc",
                          borderColor: "#0288D1",
                        },
                      }}
                    >
                      Редактировать
                    </Button>
                  </Link>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#e3f3fc", paddingY: "20px" }}>
        <Container maxWidth="xl">
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
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={avatarImage}
              alt="Фото замены"
              sx={{
                width: 350,
                height: 350,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "25px",
              }}
            />
            <Box sx={{ width: "100%" }}>
              <Grid>
                <FileInput
                  label="Выберите аватарку"
                  name="image"
                  onChange={handleAvatarChange}
                />
              </Grid>
              <Grid
                container
                justifyContent="space-between"
                sx={{ width: "100%", marginY: 2 }}
              >
                <Button
                  variant="outlined"
                  sx={{ width: "200px", marginRight: 2, marginBottom: 2 }}
                  onClick={handleAvatarSubmit}
                  disabled={!selectedAvatar}
                >
                  Сохранить аватарку
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: "200px", marginBottom: 2 }}
                  color="error"
                  onClick={handleDeleteAvatar}
                >
                  Удалить аватарку
                </Button>
              </Grid>
            </Box>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ width: "90px", alignSelf: "flex-end" }}
            >
              Close
            </Button>
          </Box>
        </Dialog>
        <CustomConfirmDialog
          open={confirmOpen}
          title="Удалить аватар"
          description="Вы уверены, что хотите удалить аватар?"
          confirmText="Удалить"
          cancelText="Отмена"
          onConfirm={handleDeleteAvatarConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      </Container>
    </>
  );
};

export default TrainerProfileDetails;
