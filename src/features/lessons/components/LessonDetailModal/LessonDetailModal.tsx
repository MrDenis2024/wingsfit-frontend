import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { fetchLesson, patchLesson } from "../../lessonsThunk.ts";
import {
  selectLesson,
  selectLessonLoading,
  selectLessonUpdating,
} from "../../lessonsSlice.ts";
import { IUser } from "../../../../types/userTypes.ts";
import { LoadingButton } from "@mui/lab";
import { unwrapResult } from "@reduxjs/toolkit";

interface LessonDetailModalProps {
  lessonId: string;
  open: boolean;
  onClose: () => void;
}

const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lessonId,
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const lesson = useAppSelector(selectLesson);
  const loading = useAppSelector(selectLessonLoading);
  const updating = useAppSelector(selectLessonUpdating);
  const [presentUsers, setPresentUsers] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      dispatch(fetchLesson(lessonId))
        .unwrap()
        .then((fetchedLesson) => {
          setPresentUsers(fetchedLesson.presentUser.map((user) => user._id));
        });
    } else {
      setPresentUsers([]);
    }
  }, [lessonId, open, dispatch]);

  const handlePresenceChange = (userId: string) => {
    setPresentUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSavePresence = async () => {
    try {
      if (!lesson) {
        console.error("Урок не найден");
        return;
      }
      const usersToAdd = presentUsers.filter(
        (userId) => !lesson.presentUser.some((user) => user._id === userId),
      );

      if (usersToAdd.length === 0) {
        return;
      }

      const resultAction = await dispatch(
        patchLesson({
          id: lessonId,
          data: { userId: usersToAdd },
        }),
      );
      unwrapResult(resultAction);
      await dispatch(fetchLesson(lessonId)).unwrap();
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Детали урока</DialogTitle>
      <DialogContent dividers>
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}
        {!loading && lesson && (
          <Box>
            <Typography variant="h5" gutterBottom>
              {lesson.title}
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {lesson.course.title}
              </Typography>
              <Typography variant="body2">
                <strong>Преподаватель:</strong> {lesson.course.user.firstName}{" "}
                {lesson.course.user.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Тип курса:</strong> {lesson.course.courseType.name}
              </Typography>
            </Paper>

            <Typography variant="h6" mt={2} gutterBottom>
              Список участников
            </Typography>
            {lesson.participants.length > 0 ? (
              <Stack spacing={1}>
                {lesson.participants.map((participant: IUser) => (
                  <FormControlLabel
                    key={participant._id}
                    control={
                      <Checkbox
                        checked={presentUsers.includes(participant._id)}
                        onChange={() => handlePresenceChange(participant._id)}
                      />
                    }
                    label={`${participant.firstName} ${participant.lastName}`}
                  />
                ))}
              </Stack>
            ) : (
              <Alert severity="info">Участников нет</Alert>
            )}

            <Typography variant="h6" mt={2} gutterBottom>
              Присутствующие
            </Typography>
            {lesson.presentUser.length > 0 ? (
              <Stack spacing={1}>
                {lesson.presentUser.map((user) => (
                  <Typography key={user._id}>
                    {user.firstName} {user.lastName}
                  </Typography>
                ))}
              </Stack>
            ) : (
              <Alert severity="info">Присутствующих нет</Alert>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={updating}
          variant="contained"
          onClick={handleSavePresence}
          disabled={loading || presentUsers.length === 0}
        >
          Сохранить
        </LoadingButton>
        <Button variant="outlined" onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonDetailModal;
