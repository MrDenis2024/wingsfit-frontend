import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Alert,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";
import { selectDeleteGroupLoading } from "../groupsSlice.ts";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import { deleteGroup, fetchAllGroups } from "../groupsThunk.ts";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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
  const [confirmOpen, setConfirmOpen] = useState(false);

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
                  <IconButton
                    sx={{
                      color: "black",
                      borderColor: "black",
                      fontSize: { xs: "16px", sm: "24px" },
                      backgroundColor: "#14e6dc",
                      borderRadius: "0",
                      "&:hover": {
                        backgroundColor: "#dff3fc",
                        borderColor: "#0288D1",
                      },
                      ml: 1,
                    }}
                  >
                    <AcUnitIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      color: "black",
                      borderColor: "black",
                      fontSize: { xs: "16px", sm: "24px" },
                      backgroundColor: "#14e6dc",
                      borderRadius: "0",
                      "&:hover": {
                        backgroundColor: "#dff3fc",
                        borderColor: "#0288D1",
                      },
                      ml: 1,
                    }}
                  >
                    <DeleteOutlineIcon />
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
    </>
  );
};

export default GroupCard;
