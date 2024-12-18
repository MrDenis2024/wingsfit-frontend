import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectClientProfile,
  selectClientProfileLoading,
} from "./clientSlice.ts";
import { fetchUpdateAvatarClient, getClientProfile } from "./clientThunk.ts";
import {
    Box,
    Button,
    CardMedia,
    Collapse,
    Container,
    Dialog,
    Grid2,
    IconButton, Theme,
    Typography, useMediaQuery,
} from "@mui/material";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import SchoolIcon from "@mui/icons-material/School";
import HealingIcon from "@mui/icons-material/Healing";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { apiURL, findCourseTypes } from "../../constants.ts";
import { selectCourseTypes } from "../CourseTypes/CourseTypesSlice.ts";
import { CourseTypeFields } from "../../types/courseTypes.ts";
import { toast } from "react-toastify";
import FileInput from "../../UI/FileInput/FileInput.tsx";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";
import CustomConfirmDialog from "../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import { reloadUser } from "../users/userThunk.ts";
import Grid from "@mui/material/Grid2";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const OneClient = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const oneClient = useAppSelector(selectClientProfile);
  const isLoading = useAppSelector(selectClientProfileLoading);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const courseTypes = useAppSelector(selectCourseTypes);
  const [avatarImage, setAvatarImage] = useState(imageNotFound);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  let cardImage = imageNotFound;

  if (oneClient && oneClient.user.avatar) {
    cardImage = `${apiURL}/${oneClient.user.avatar}`;
  }

  useEffect(() => {
    if (oneClient?.user.avatar) {
      setAvatarImage(`${apiURL}/${oneClient.user.avatar}`);
    }
  }, [oneClient]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAvatarImage(cardImage);
    setSelectedAvatar(null);
  };

  let preferredWorkoutType: CourseTypeFields[] = [];

  if (oneClient) {
    preferredWorkoutType = findCourseTypes(
      courseTypes,
      ...oneClient.preferredWorkoutType,
    );
  }

  useEffect(() => {
    dispatch(getClientProfile(id));
  }, [dispatch, id]);

  const toggleStatus = () => setIsStatusOpen((prev) => !prev);

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
      await dispatch(fetchUpdateAvatarClient(selectedAvatar)).unwrap();
      dispatch(reloadUser());
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
      await dispatch(fetchUpdateAvatarClient(null)).unwrap();
      toast("Avatar deleted successfully");
      setAvatarImage(imageNotFound);
      await dispatch(reloadUser());
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

    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("md"),
    );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingIndicator />
      </Box>
    );
  }

  return (
    oneClient && (
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
                  alt={`Фото профиля ${oneClient.user.firstName}`}
                  sx={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
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
              </Grid>
              <Grid
                size={{ md: 7, sm: 6, xs: 12 }}
                justifyContent={{ xs: "center" }}
                sx={{
                  px: "15px",
                }}
              >
                <Box  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant={isSmallScreen?"h5":"h4"}
                    sx={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    {oneClient?.user.firstName} {oneClient?.user.lastName}
                  </Typography>
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
                            <BorderColorIcon/>
                        </IconButton>
                    </Link>
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
                    <span>{oneClient?.user.phoneNumber}</span>
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
                      {oneClient?.user.dateOfBirth?.slice(0, 10) || "N/A"}
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
                    {oneClient?.user.gender === "male" && <MaleIcon />}
                    {oneClient?.user.gender === "female" && <FemaleIcon />}
                    {oneClient?.user.gender === "other" && <TransgenderIcon />}
                      {isSmallScreen ? <></> : <strong>Пол:</strong>}
                      <span>{oneClient?.user.gender || "N/A"}</span>
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
                        {isSmallScreen ? <></> : <strong>Уровень тренировоу:</strong>}
                      {oneClient?.trainingLevel}
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
                      <HealingIcon /> {isSmallScreen ? <></> : <strong>Физичкские данные:</strong>}
                      {oneClient?.physicalData}
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
                    {oneClient?.subscribes?.length === 0 ? (
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "12px", color: "#01579B" }}
                      >
                       Нет активных подписок на тренировки
                      </Typography>
                    ) : (
                      oneClient?.subscribes?.map((subscription, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{ fontSize: "12px", color: "#01579B" }}
                        >
                          {subscription}
                        </Typography>
                      ))
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
                    onClick={handleAvatarSubmit}
                    disabled={!selectedAvatar}
                    sx={{ width: "200px", marginRight: 2, marginBottom: 2 }}
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
          <CustomConfirmDialog
            open={confirmOpen}
            title="Удалить аватар"
            description="Вы уверены, что хотите удалить аватар?"
            confirmText="Удалить"
            cancelText="Отмена"
            onConfirm={handleDeleteAvatarConfirm}
            onCancel={() => setConfirmOpen(false)}
          />
        </Box>
      </>
    )
  );
};

export default OneClient;
