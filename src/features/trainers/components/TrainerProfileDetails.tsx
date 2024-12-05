import {
  Box,
  Button,
  CardMedia, CircularProgress, Collapse,
  Container,
  Dialog,
  Grid2, IconButton,
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
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import React, { useEffect, useState } from "react";
import { ICourse } from "../../../types/courseTypes.ts";
import CourseCards from "../../courses/components/CourseCards.tsx";
import RatingAndReviews from "./RatingAndReviews.tsx";
import ReviewFormBlock from "../../reviewForm/components/ReviewFormBlock.tsx";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  fetchUpdateAvatarTrainer,
  getTrainerProfile,
} from "../trainersThunks.ts";
import { apiURL } from "../../../constants.ts";
import {selectOneTrainer, selectOneTrainerLoading} from "../trainersSlice.ts";
import NewAddTrainerCertificates from "../NewAddTrainerCertificates.tsx";
import { ITrainer } from "../../../types/trainerTypes.ts";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface TrainerProfileDetailsProps {
  avatarImage: string;
  trainerProfile: ITrainer;
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
  const oneTrainer = useAppSelector(selectOneTrainer);
  const isFetching = useAppSelector(selectOneTrainerLoading);
  const [open, setOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState(imageNotFound);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const toggleStatus = () => setIsStatusOpen((prev) => !prev);
  let cardImage = imageNotFound;

  if (oneTrainer && oneTrainer.user.avatar) {
    cardImage = `${apiURL}/${oneTrainer.user.avatar}`;
  }

  useEffect(() => {
    if (oneTrainer?.user.avatar) {
      setAvatarImage(`${apiURL}/${oneTrainer.user.avatar}`);
    }
  }, [oneTrainer]);

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
      await dispatch(getTrainerProfile(id));
      toast("Avatar updated successfully");
      setSelectedAvatar(null);
      handleClose();
    } catch (err) {
      console.error("Failed to update avatar:", err);
      toast("Failed to update avatar");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await dispatch(fetchUpdateAvatarTrainer(null)).unwrap();
      toast("Avatar deleted successfully");
      dispatch(getTrainerProfile(id));
      setAvatarImage(imageNotFound);
    } catch (err) {
      console.error("Failed to delete avatar:", err);
      toast("Failed to delete avatar");
    }
  };
  return (
    <>
      <Box sx={{ backgroundColor: "#dedfe3", paddingY: "25px" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="center">
            <Grid
              sx={{ gridColumn: { xs: "span 12", sm: "span 4", md: "span 3", marginBottom: "auto" } }}
            >
              <CardMedia
                component="img"
                image={cardImage}
                alt={`Фото тренера ${trainerProfile.user.firstName}`}
                sx={{
                  width: 200,
                  height: 200,
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
              sx={{ gridColumn: { xs: "span 12", sm: "span 8", md: "span 9" } }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {trainerProfile.user.firstName} {trainerProfile.user.lastName}
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
                  <strong>Phone number:</strong>{" "}
                  <span>{trainerProfile.user.phoneNumber || "N/A"}</span>
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
                  <strong>Date of Birth: </strong>
                  <span>
                    {trainerProfile.user.dateOfBirth.slice(0, 10) || "N/A"}
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
                  {trainerProfile.user.gender === "male" && <MaleIcon />}
                  {trainerProfile.user.gender === "female" && <FemaleIcon />}
                  {trainerProfile.user.gender === "other" && (
                    <TransgenderIcon />
                  )}
                  <strong>Gender:</strong>{" "}
                  <span>{trainerProfile.user.gender || "N/A"}</span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <FitnessCenterIcon />
                  <strong>Specialization:</strong>{" "}
                  {trainerProfile.specialization ||
                    "No specialization provided"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <AutoAwesomeIcon />
                  <strong>Experience:</strong>{" "}
                  {trainerProfile.experience || "Experience not provided"}
                </Typography>
                <Box
                sx={{   maxWidth: "1200px",
                  width: "100%",}}
                >
                  <Box
                      onClick={toggleStatus}
                      sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    cursor: "pointer",
                  }}>
                  <Typography
                      variant="body1"
                      sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <WorkspacePremiumIcon />
                    <strong>Показать сертификаты:</strong>
                  </Typography>
                  <IconButton>
                    {isStatusOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  </Box>
                  <Collapse in={isStatusOpen}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start",gap: "15px", }}>
                      {isFetching ? (
                          <CircularProgress />
                      ) : trainerProfile.certificates?.length ? (
                          trainerProfile.certificates.map((certificate) => (
                              <Box
                                  key={certificate._id}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    maxWidth: 200,
                                    width: "100%",
                                    padding: "10px",
                                    boxSizing: "border-box",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    marginBottom: "15px",
                                  }}
                              >
                                <Typography variant="body1" sx={{ fontWeight: "bold", alignItems: "start" }}>
                                  {certificate.title}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image={`${apiURL}/${certificate.image}`}
                                    alt={certificate.title}
                                    sx={{
                                      width: 150,
                                      height: 150,
                                      objectFit: "cover",
                                      borderRadius: "10px",
                                      marginTop: "5px",
                                    }}
                                />
                              </Box>
                          ))
                      ) : (
                          <Typography>Сертификаты отсутствуют.</Typography>
                      )}
                    </Box>
                  </Collapse>
                </Box>
                {isOwner && (
                <NewAddTrainerCertificates />
                )}
                {!isOwner && (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: "fit-content" }}
                  >
                    Chat with Trainer
                  </Button>
                )}
                {isOwner && (
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
                    Edit profile
                  </Button>
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
            {trainerProfile.description || "No description available."}
          </Typography>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#ffffff", paddingY: "25px" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Available Courses
          </Typography>
          <CourseCards courses={courses} />

          <Box sx={{ marginTop: "40px" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Rating and Reviews
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "15px",
              }}
            >
              <RatingAndReviews id={id} />
            </Box>

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
                    {showForm ? "Close Review Form" : "Leave a Review"}
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
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        marginBottom: "15px",
                        textAlign: "center",
                      }}
                    >
                      Leave a Review
                    </Typography>
                    <ReviewFormBlock onSubmit={handleReviewSubmit} />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Container>
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
              <Grid2>
                <FileInput
                  label="Выберите аватарку"
                  name="image"
                  onChange={handleAvatarChange}
                />
              </Grid2>
              <Grid2
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
              </Grid2>
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
      </Box>
    </>
  );
};

export default TrainerProfileDetails;
