import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Alert,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";
import {
  selectActivateClientLoading,
  selectDeleteGroupLoading,
  selectFreezeClientLoading,
  selectRemoveClientLoading,
  selectSubscribeLoading,
} from "../groupsSlice.ts";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import {
  activateClient,
  deleteGroup,
  fetchAllGroups,
  freezeClient,
  removeClient,
  updateSubscribe,
} from "../groupsThunk.ts";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { GlobalError } from "../../../types/userTypes.ts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Modal from "../../../UI/Modal/Modal.tsx";

interface Props {
  group: IGroup;
  activeGroup: string | null;
  handleAccordionChange: (groupId: string) => void;
}

const GroupCard: React.FC<Props> = ({
  group,
  activeGroup,
  handleAccordionChange,
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deleteGroupLoading = useAppSelector(selectDeleteGroupLoading);
  const deleteClientLoading = useAppSelector(selectRemoveClientLoading);
  const freezeLoading = useAppSelector(selectFreezeClientLoading);
  const activeLoading = useAppSelector(selectActivateClientLoading);
  const updateSubscribeLoading = useAppSelector(selectSubscribeLoading);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmClientDelete, setConfirmClientDelete] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<{
    id: string;
    firstName: string;
    lastName: string;
  } | null>(null);
  const [openSubscriptionDialog, setOpenSubscriptionDialog] = useState(false);
  const [clientToExtend, setClientToExtend] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    subscribeEnd: string;
  } | null>(null);
  const [newEndDate, setNewEndDate] = useState<string>("");

  const handleGroupDelete = async (groupId: string) => {
    try {
      await dispatch(deleteGroup(groupId)).unwrap();
      dispatch(fetchAllGroups());
      toast.success("Группа успешно удалена");
    } catch {
      toast.error("Произошла ошибка при удалении группы");
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleClientDelete = async (clientId: string) => {
    try {
      await dispatch(removeClient({ id: group._id, clientId })).unwrap();
      dispatch(fetchAllGroups());
      toast.success("Клиент успешно удален из группы");
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    } finally {
      setConfirmClientDelete(false);
      setClientToDelete(null);
    }
  };

  const handleOpenClientDeleteConfirm = (
    clientId: string,
    firstName: string,
    lastName: string,
  ) => {
    setClientToDelete({ id: clientId, firstName, lastName });
    setConfirmClientDelete(true);
  };

  const handleFreezeClient = async (clientId: string) => {
    try {
      await dispatch(freezeClient({ id: group._id, clientId })).unwrap();
      dispatch(fetchAllGroups());
      toast.success("Клиент успешно заморожен");
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    }
  };

  const handleActiveClient = async (clientId: string) => {
    try {
      await dispatch(activateClient({ id: group._id, clientId })).unwrap();
      dispatch(fetchAllGroups());
      toast.success("Клиент успешно разморожен");
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    }
  };

  const handleOpenSubscriptionDialog = (
    clientId: string,
    firstName: string,
    lastName: string,
    subscribeEnd: Date,
  ) => {
    const formattedEndDate = new Date(subscribeEnd).toISOString().split("T")[0];
    setClientToExtend({
      id: clientId,
      firstName,
      lastName,
      subscribeEnd: formattedEndDate,
    });
    setOpenSubscriptionDialog(true);
  };

  const handleExtendSubscription = async () => {
    if (clientToExtend && newEndDate) {
      try {
        await dispatch(
          updateSubscribe({
            id: group._id,
            clientId: clientToExtend.id,
            newSubscribeEnd: newEndDate,
          }),
        ).unwrap();
        dispatch(fetchAllGroups());
        toast.success("Подписка успешно продлена");
      } catch (error) {
        toast.error((error as GlobalError).error || "Произошла ошибка");
      } finally {
        setOpenSubscriptionDialog(false);
        setNewEndDate("");
        setClientToExtend(null);
      }
    }
  };

  return (
    <>
      <Accordion
        expanded={activeGroup === group._id}
        onChange={() => handleAccordionChange(group._id)}
        sx={{ mb: 2 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid
            container
            sx={{
              alignItems: "center",
              minWidth: "100%",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Grid sx={{ mb: { xs: 1, sm: 0 } }}>
              <Typography variant="body1">{group.title}</Typography>
              <Typography variant="body2">
                {group.clients.length}/{group.maxClients} участников
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: {
                  xs: "10px",
                  sm: "unused",
                },
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={group.clients.length === 0}
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "16px",
                  },
                }}
              >
                Начать занятие
              </Button>
              <Grid>
                <IconButton
                  sx={{
                    color: "black",
                    borderColor: "black",
                    fontSize: { xs: "16px", sm: "24px" },
                    "&:hover": {
                      backgroundColor: "#dff3fc",
                      borderColor: "#0288D1",
                    },
                    ml: 1,
                  }}
                >
                  <GroupAddIcon />
                </IconButton>
                {(group.course.user === user?._id ||
                  user?.role === "admin" ||
                  user?.role === "superAdmin") && (
                  <>
                    <IconButton
                      sx={{
                        color: "black",
                        borderColor: "black",
                        fontSize: { xs: "16px", sm: "24px" },
                        "&:hover": {
                          backgroundColor: "#dff3fc",
                          borderColor: "#0288D1",
                        },
                        ml: 1,
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setConfirmOpen(true);
                      }}
                      disabled={
                        deleteGroupLoading
                          ? deleteGroupLoading === group._id
                          : false
                      }
                    >
                      {deleteGroupLoading === group._id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <DeleteSweepIcon />
                      )}
                    </IconButton>
                    {(group.course.user === user?._id ||
                      user?.role === "admin" ||
                      user?.role === "superAdmin") && (
                      <Link
                        to={`/edit-group/${group._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <IconButton
                          sx={{
                            color: "black",
                            borderColor: "black",
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
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
      </Accordion>
      {activeGroup === group._id && (
        <List>
          {group.clients.length > 0 ? (
            group.clients.map((client) => (
              <ListItem
                key={client._id}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Link
                  to={`/clients/${client.client._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="body1">
                    {client.client.lastName} {client.client.firstName}
                  </Typography>
                </Link>
                <Grid>
                  {client.status === "active" && (
                    <IconButton
                      sx={{
                        color: "black",
                        borderColor: "black",
                        fontSize: { xs: "16px", sm: "24px" },
                        backgroundColor: "#14e6dc",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(20, 230, 220, 0.5)",
                        "&:hover": {
                          backgroundColor: "#dff3fc",
                          borderColor: "#0288D1",
                          transform: "scale(1.05)",
                        },
                        ml: 1,
                      }}
                      onClick={() => handleFreezeClient(client.client._id)}
                      disabled={
                        freezeLoading
                          ? freezeLoading === client.client._id
                          : false
                      }
                    >
                      {freezeLoading === client.client._id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <AcUnitIcon />
                      )}
                    </IconButton>
                  )}
                  {client.status === "frozen" && (
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
                      onClick={() => handleActiveClient(client.client._id)}
                      disabled={
                        activeLoading
                          ? activeLoading === client.client._id
                          : false
                      }
                    >
                      {activeLoading === client.client._id ? (
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
                    disabled={
                      deleteClientLoading
                        ? deleteClientLoading === client.client._id
                        : false
                    }
                    onClick={() =>
                      handleOpenClientDeleteConfirm(
                        client.client._id,
                        client.client.firstName,
                        client.client.lastName,
                      )
                    }
                  >
                    {deleteClientLoading === client.client._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <PersonRemoveIcon />
                    )}
                  </IconButton>
                  <IconButton
                    sx={{
                      color: "white",
                      borderColor: "transparent",
                      fontSize: { xs: "16px", sm: "24px" },
                      backgroundColor: "#027a02",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(255, 99, 71, 0.5)",
                      "&:hover": {
                        backgroundColor: "#027a02",
                        borderColor: "#027a02",
                        transform: "scale(1.05)",
                      },
                      ml: 1,
                    }}
                    disabled={
                      updateSubscribeLoading
                        ? updateSubscribeLoading === client.client._id
                        : false
                    }
                    onClick={() =>
                      handleOpenSubscriptionDialog(
                        client.client._id,
                        client.client.firstName,
                        client.client.lastName,
                        client.subscribeEnd,
                      )
                    }
                  >
                    {updateSubscribeLoading === client.client._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <AccessTimeIcon />
                    )}
                  </IconButton>
                </Grid>
              </ListItem>
            ))
          ) : (
            <Alert severity="info">Нет подписчиков для данной группы</Alert>
          )}
        </List>
      )}
      <CustomConfirmDialog
        open={confirmOpen}
        title="Удалить группу"
        description="Вы уверены, что хотите удалить данную группу? Так же удалятся и заниятия к этой группы."
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={() => handleGroupDelete(group._id)}
        onCancel={() => setConfirmOpen(false)}
      />
      <CustomConfirmDialog
        open={confirmClientDelete}
        title="Удалить клиента из группы"
        description={`Вы уверены, что хотите удалить клиента "${clientToDelete?.firstName} ${clientToDelete?.lastName}" из группы?`}
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={() =>
          clientToDelete && handleClientDelete(clientToDelete.id)
        }
        onCancel={() => {
          setConfirmClientDelete(false);
          setClientToDelete(null);
        }}
      />
      <Modal
        show={openSubscriptionDialog}
        onClose={() => setOpenSubscriptionDialog(false)}
        title={`Продлить подписку клиенту ${clientToExtend?.firstName} ${clientToExtend?.lastName}?`}
      >
        <Grid>
          <Typography>
            Текущая дата окончания подписки:{" "}
            {clientToExtend?.subscribeEnd
              ? new Date(clientToExtend.subscribeEnd).toLocaleDateString()
              : "Дата не указана"}
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Новая дата окончания подписки"
              type="date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </FormControl>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            onClick={() => setOpenSubscriptionDialog(false)}
            color="primary"
          >
            Отмена
          </Button>
          <Button
            onClick={handleExtendSubscription}
            color="primary"
            disabled={!newEndDate}
          >
            Подтвердить
          </Button>
        </Grid>
      </Modal>
    </>
  );
};

export default GroupCard;
