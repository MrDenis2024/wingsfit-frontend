import React, {useState} from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import {IGroup} from "../../../types/groupTypes.ts";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/userSlice.ts";
import {selectDeleteGroupLoading} from "../groupsSlice.ts";
import ClearIcon from "@mui/icons-material/Clear";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import {deleteGroup, fetchAllGroups} from "../groupsThunk.ts";
import {toast} from "react-toastify";

interface Props {
  group: IGroup;
}

const GroupCard: React.FC<Props> = ({ group }) => {
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{group.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ sm: 3, xs: 12 }}>
                  <Typography
                      variant="body2"
                      textAlign={{ sm: "start", xs: "center" }}
                  >
                    Уровень: {group.trainingLevel}
                  </Typography>
                </Grid>
                <Grid size={{ sm: 3, xs: 12 }}>
                  <Typography
                      variant="body2"
                      textAlign={{ sm: "center", xs: "center" }}
                  >
                    Начало:{group.startTime}, длительность: {group.scheduleLength}{" "}
                    {group.scheduleLength === 5
                        ? "часов"
                        : group.scheduleLength > 1
                            ? "часа"
                            : "час"}
                  </Typography>
                </Grid>
                <Grid
                    size={{ sm: 4, xs: 12 }}
                    textAlign={{ sm: "end", xs: "center" }}
                >
                  <Typography variant="body2">
                    Доступно: {group.maxClients - group.clients.length}/
                    {group.maxClients}
                  </Typography>
                </Grid>
                <Grid container size={{ sm: 2, xs: 12 }} justifyContent="flex-end">
                  {(group.course.user === user?._id || user?.role === "admin" || user?.role === "superAdmin") && (
                      <IconButton
                          sx={{
                            color: "red",
                            borderColor: "#0288D1",
                            "&:hover": {
                              backgroundColor: "#dff3fc",
                              borderColor: "#0288D1",
                            },
                            ml: 1,
                          }}
                          onClick={() => setConfirmOpen(true)}
                          disabled={deleteGroupLoading ? deleteGroupLoading === group._id : false}
                      >
                        {deleteGroupLoading === group._id ? (
                            <CircularProgress size={24} />
                        ) : (
                            <ClearIcon />
                        )}
                      </IconButton>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
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
