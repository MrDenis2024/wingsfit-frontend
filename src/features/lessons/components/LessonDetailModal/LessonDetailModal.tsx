import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  Stack, List, ListItem, ListItemIcon, ListItemText,
} from "@mui/material";
import { Lesson } from "../../../../types/lessonTypes.ts";
import PersonIcon from '@mui/icons-material/Person';

interface Props {
  oneLesson: Lesson;
  open: boolean;
  onClose: () => void;
}

const LessonDetailModal: React.FC<Props> = ({
  oneLesson,
  open,
  onClose,
}) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Детали урока</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography variant="h5" gutterBottom>
            {oneLesson.group.title}
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              gutterBottom
            >
              {oneLesson.group.course.title}
            </Typography>
            <Typography variant="body2">
              <strong>Курс:</strong> {oneLesson.group.title}
            </Typography>
          </Paper>

          <Typography variant="h6" mt={2} gutterBottom>
            Отсутствующие
          </Typography>
          {oneLesson.notPresent.length > 0 ? (
            <Stack spacing={1}>
              <List>
                {oneLesson.notPresent.map((client) => (
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${client.firstName} ${client.lastName}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          ) : (
            <Alert severity="info">Участников нет</Alert>
          )}
          <Typography variant="h6" mt={2} gutterBottom>
            Присутствующие
          </Typography>
          {oneLesson.arePresent.length > 0 ? (
            <Stack spacing={1}>
              <List>
                {oneLesson.arePresent.map((client) => (
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${client.firstName} ${client.lastName}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          ) : (
            <Alert severity="info">Присутствующих нет</Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonDetailModal;
