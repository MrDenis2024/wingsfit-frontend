import React, { useEffect, useState } from "react";
import { Box, Button, CardMedia, Dialog, Grid2 } from "@mui/material";
import FileInput from "../FileInput/FileInput.tsx";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { apiURL } from "../../constants.ts";
import { ITrainer } from "../../types/trainerTypes.ts";
import { fetchUpdateAvatarTrainer } from "../../features/trainers/trainersThunks.ts";
import { reloadUser } from "../../features/users/userThunk.ts";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks.ts";
import CustomConfirmDialog from "../CustomConfirmDialog/CustomConfirmDialog.tsx";
import { IClient } from "../../types/clientTypes.ts";
import { fetchUpdateAvatarClient } from "../../features/clients/clientThunk.ts";

interface Props {
  trainerProfile: ITrainer | null;
  clientProfile: IClient | null;
  open: boolean;
  onClose: () => void;
}

const AvatarUploader: React.FC<Props> = ({
  trainerProfile,
  clientProfile,
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [avatarImage, setAvatarImage] = useState(imageNotFound);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  let cardImage = imageNotFound;
  const isTrainer = trainerProfile !== null;
  const isClient = clientProfile !== null;

  if (isTrainer && trainerProfile?.user.avatar) {
    cardImage = `${apiURL}/${trainerProfile.user.avatar}`;
  } else if (isClient && clientProfile?.user.avatar) {
    cardImage = `${apiURL}/${clientProfile.user.avatar}`;
  }

  useEffect(() => {
    if (isTrainer && trainerProfile?.user.avatar) {
      setAvatarImage(`${apiURL}/${trainerProfile.user.avatar}`);
    } else if (isClient && clientProfile?.user.avatar) {
      setAvatarImage(`${apiURL}/${clientProfile.user.avatar}`);
    }
  }, [trainerProfile, clientProfile, isTrainer, isClient]);

  const handleClose = () => {
    onClose();
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
      if (isTrainer) {
        await dispatch(fetchUpdateAvatarTrainer(selectedAvatar)).unwrap();
      } else if (isClient) {
        await dispatch(fetchUpdateAvatarClient(selectedAvatar)).unwrap();
      }
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
      if (isTrainer) {
        await dispatch(fetchUpdateAvatarTrainer(null)).unwrap();
      } else if (isClient) {
        await dispatch(fetchUpdateAvatarClient(null)).unwrap();
      }
      toast("Avatar deleted successfully");
      await dispatch(reloadUser());
      setAvatarImage(imageNotFound);
      handleClose();
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
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "500px",
            width: "90vw",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <CardMedia
            component="img"
            image={avatarImage}
            alt="Аватар пользователя"
            sx={{
              width: { xs: 200, sm: 300, md: 350 },
              height: { xs: 200, sm: 300, md: 350 },
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <FileInput
            label="Выберите аватарку"
            name="image"
            onChange={handleAvatarChange}
          />
          <Grid2
            container
            spacing={2}
            justifyContent="center"
            sx={{
              width: "100%",
              marginTop: 2,
              "@media (max-width: 450px)": {
                flexDirection: "column",
                gap: 2,
              },
            }}
          >
            <Grid2
              size={{
                xs: 12,
                sm: "auto",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  textTransform: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={handleAvatarSubmit}
                disabled={!selectedAvatar}
              >
                Сохранить аватарку
              </Button>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: "auto",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  textTransform: "none",
                  borderColor: "error.main",
                  "&:hover": {
                    borderColor: "error.dark",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  },
                }}
                onClick={handleDeleteAvatar}
              >
                Удалить аватарку
              </Button>
            </Grid2>
          </Grid2>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "12px", sm: "14px" },
              textTransform: "none",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            Закрыть
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
    </>
  );
};

export default AvatarUploader;
