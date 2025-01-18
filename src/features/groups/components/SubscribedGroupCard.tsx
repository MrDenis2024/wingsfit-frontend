import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import { apiURL } from "../../../constants.ts";
import imageNotFound from "../../../assets/images/user-icon-not-found.png";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";
import {
  activateClient,
  fetchAllGroups,
  removeClient,
} from "../groupsThunk.ts";
import { toast } from "react-toastify";
import { GlobalError } from "../../../types/userTypes.ts";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import {
  selectActiveClientLoading,
  selectDeleteClientLading,
} from "../groupsSlice.ts";

interface Props {
  group: IGroup;
  id: string;
}

const CoursesGroupCards: React.FC<Props> = ({ group, id }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const activeClientLoading = useAppSelector(selectActiveClientLoading);
  const deleteClientLoading = useAppSelector(selectDeleteClientLading);
  const [confirmClientDelete, setConfirmClientDelete] = useState(false);
  const mediaQuery500 = useMediaQuery("(min-width:500px)");

  const clientSubscription = group.clients.find(
    (client) => client.client._id === id,
  );

  if (!clientSubscription) {
    return null;
  }

  let cardImage = imageNotFound;

  if (group.course.image) {
    cardImage = `${apiURL}/${group.course.image}`;
  }

  const isClient = user?.role === "client";

  const handleActiveClient = async (clientId: string) => {
    try {
      await dispatch(activateClient({ id: group._id, clientId })).unwrap();
      dispatch(fetchAllGroups());
      toast.success("Вы успешно разморожены");
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    }
  };

  const handleClientDelete = async (clientId: string) => {
    try {
      await dispatch(removeClient({ id: group._id, clientId })).unwrap();
      dispatch(fetchAllGroups());
      toast.success("Вы успешно вышле из группы");
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    } finally {
      setConfirmClientDelete(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: mediaQuery500 ? "300px" : "250px",
          border: "1px solid silver",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: mediaQuery500 ? "row" : "column",
            gap: mediaQuery500 ? "20px" : "10px",
            flexWrap: "wrap",
            alignItems: mediaQuery500 ? "center" : "start",
          }}
        >
          <Typography variant="h5" sx={{ fontSize: "16px" }} component="div">
            {group.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            Цена: {group.course.price}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            Дата окончания подписки:{" "}
            {new Date(clientSubscription.subscribeEnd).toLocaleDateString()}
          </Typography>
          <CardMedia
            component="img"
            image={cardImage}
            alt={group.course.title}
            sx={{
              flex: "0 0 auto",
              maxWidth: "100%",
              borderRadius: "8px",
            }}
          />
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            Время начала тренировки: {group.startTime}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            Продолжительность: {group.scheduleLength} часов
          </Typography>
        </CardContent>
        {isClient && (
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            {clientSubscription.status === "frozen" && (
              <IconButton
                sx={{
                  color: "white",
                  borderColor: "transparent",
                  fontSize: { xs: "16px", sm: "24px" },
                  backgroundColor: "#ff6347",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(255, 99, 71, 0.5)",
                  "&:hover": {
                    backgroundColor: "#ff4500",
                    borderColor: "#ff6347",
                    transform: "scale(1.05)",
                  },
                  ml: 1,
                }}
                onClick={() =>
                  handleActiveClient(clientSubscription.client._id)
                }
                disabled={
                  activeClientLoading
                    ? activeClientLoading === group._id
                    : false
                }
              >
                {activeClientLoading === group._id ? (
                  <CircularProgress size={24} />
                ) : (
                  <WhatshotIcon />
                )}
              </IconButton>
            )}
            <IconButton
              sx={{
                color: "white",
                borderColor: "transparent",
                fontSize: { xs: "16px", sm: "24px" },
                backgroundColor: "#d32f2f",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(211, 47, 47, 0.5)",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                  borderColor: "#d32f2f",
                  transform: "scale(1.05)",
                },
                ml: 1,
              }}
              onClick={() => setConfirmClientDelete(true)}
              disabled={
                deleteClientLoading ? deleteClientLoading === group._id : false
              }
            >
              {deleteClientLoading === group._id ? (
                <CircularProgress size={24} />
              ) : (
                <CancelIcon />
              )}
            </IconButton>
          </CardActions>
        )}
      </Card>
      <CustomConfirmDialog
        open={confirmClientDelete}
        title="Выход из группы"
        description="Вы уверены, что хотите выйти из группы?"
        confirmText="Да"
        cancelText="Нет"
        onConfirm={() => handleClientDelete(clientSubscription.client._id)}
        onCancel={() => {
          setConfirmClientDelete(false);
        }}
      />
    </>
  );
};

export default CoursesGroupCards;
