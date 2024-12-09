import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
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
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Состояние для диалога подтверждения

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
    setIsConfirmDialogOpen(true); // Открыть кастомный диалог
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
            <CircularProgress />
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
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
          maxHeight: "100%",
          padding: 0,
          margin: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "980px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {selectedCertificate && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                }}
              >
                <CardMedia
                  component="img"
                  image={`${apiURL}/${selectedCertificate.image}`}
                  alt={selectedCertificate.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ marginBottom: "15px", textAlign: "center" }}
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
              sx={{ width: "200px", marginBottom: 2 }}
              color="error"
              onClick={handleOpenConfirmDialog}
            >
              Удалить сертификат
            </Button>
          )}
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
