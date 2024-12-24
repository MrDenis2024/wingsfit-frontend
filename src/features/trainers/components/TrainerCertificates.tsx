import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Collapse,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { apiURL } from "../../../constants.ts";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectTrainerProfileLoading } from "../trainersSlice.ts";
import { deleteCertificate, getTrainerProfile } from "../trainersThunks.ts";
import { toast } from "react-toastify";
import { selectUser } from "../../users/userSlice.ts";
import { ITrainer } from "../../../types/trainerTypes.ts";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  trainerProfile: ITrainer | null;
}

const TrainerCertificates: React.FC<Props> = ({ trainerProfile }) => {
  const dispatch = useAppDispatch();
  const iUser = useAppSelector(selectUser);
  const isFetching = useAppSelector(selectTrainerProfileLoading);

  const [selectedCertificate, setSelectedCertificate] = useState<{
    _id: string;
    title: string;
    image: string;
  } | null>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const toggleStatus = () => setIsStatusOpen((prev) => !prev);

  const [open, setOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [scale, setScale] = useState(1); // Масштабирование
  const [isFullScreen, setIsFullScreen] = useState(false); // Полноэкранный режим
  const [isImageClicked, setIsImageClicked] = useState(false); // Состояние клика по изображению

  useEffect(() => {
    if (trainerProfile?.certificates?.length) {
      setSelectedCertificate(trainerProfile.certificates[0]);
    }
  }, [trainerProfile]);

  const handleClickOpen = (certificate: {
    _id: string;
    title: string;
    image: string;
  }) => {
    setSelectedCertificate(certificate);
    setOpen(true);
    setScale(1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCertificate = async () => {
    if (selectedCertificate && trainerProfile) {
      try {
        await dispatch(deleteCertificate(selectedCertificate._id)).unwrap();
        dispatch(getTrainerProfile(trainerProfile.user._id));
        toast.success("Certificate deleted successfully.");
      } catch (error) {
        console.error("Delete certificate error: ", error);
        toast.error("Failed to delete certificate.");
      } finally {
        setIsConfirmDialogOpen(false);
      }
    } else {
      console.error("No certificate selected.");
    }
  };

  const handleOpenConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleZoom = (delta: number) => {
    if (isImageClicked) {
      setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
    if (!isFullScreen) setScale(1);
  };

  const handleImageClick = () => {
    setIsImageClicked(true);
  };

  const handleImageClose = () => {
    setIsFullScreen(false);
    setScale(1);
    handleClose();
  };

  return (
    <Box sx={{ maxWidth: "1200px", width: "100%" }}>
      <Box
        onClick={toggleStatus}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          cursor: "pointer",
        }}
      >
        <Typography
          variant="body1"
          sx={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <WorkspacePremiumIcon />
          <strong>Показать сертификаты:</strong>
        </Typography>
        <IconButton>
          {isStatusOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={isStatusOpen}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "15px",
          }}
        >
          {isFetching ? (
            <LoadingIndicator />
          ) : trainerProfile?.certificates?.length ? (
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
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(certificate)}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", alignItems: "start" }}
                >
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
      <Dialog
        open={open}
        onClose={handleImageClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiDialog-paper": {
            overflow: "hidden",
            borderRadius: "12px",
            maxWidth: isFullScreen ? "100%" : "980px",
            maxHeight: isFullScreen ? "100%" : "80vh",
            width: "100%",
            height: isFullScreen ? "100%" : "auto",
            position: "relative",
            "@media (max-width: 350px)": {
              maxHeight: "50vh",
              position: "none",
            },
          },
        }}
      >
        <IconButton
          onClick={handleImageClose}
          sx={{
            position: "absolute",
            top: -6,
            right: 0,
            color: "black",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            width: "100%",
            height: "100%",
          }}
        >
          {selectedCertificate && (
            <>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  cursor: isFullScreen ? "zoom-out" : "zoom-in",
                  maxHeight: isFullScreen ? "100%" : "calc(80vh - 120px)",
                }}
                onClick={toggleFullScreen}
                onWheel={(e) => handleZoom(e.deltaY > 0 ? -0.1 : 0.1)}
              >
                <CardMedia
                  component="img"
                  image={`${apiURL}/${selectedCertificate.image}`}
                  alt={selectedCertificate.title}
                  onClick={handleImageClick}
                  sx={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.2s",
                    width: isFullScreen ? "100%" : "auto",
                    height: isFullScreen ? "100%" : "auto",
                    maxWidth: "100%",
                    maxHeight: isFullScreen ? "100%" : "calc(80vh - 120px)",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  marginTop: "15px",
                  marginBottom: "10px",
                  textAlign: "center",
                  wordWrap: "break-word",
                  "@media (max-width: 350px)": {
                    fontSize: "16px",
                  },
                }}
              >
                {selectedCertificate.title}
              </Typography>
            </>
          )}
          {(trainerProfile?.user?.role === "admin" ||
            trainerProfile?.user?.role === "superAdmin" ||
            iUser?._id === trainerProfile?.user?._id) && (
            <Button
              variant="outlined"
              color="error"
              sx={{
                width: "200px",
                marginBottom: 2,
                textTransform: "none",
                display: isFullScreen ? "none" : "block",
                "@media (max-width: 350px)": {
                  fontSize: "12px",
                },
              }}
              onClick={handleOpenConfirmDialog}
            >
              Удалить сертификат
            </Button>
          )}
        </Box>
      </Dialog>
      <CustomConfirmDialog
        open={isConfirmDialogOpen}
        title="Удалить сертификат"
        description={`Вы уверены, что хотите удалить сертификат "${selectedCertificate?.title}"?`}
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={handleDeleteCertificate}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />
    </Box>
  );
};

export default TrainerCertificates;
