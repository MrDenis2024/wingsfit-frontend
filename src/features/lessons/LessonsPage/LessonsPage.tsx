import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Alert,
  Container,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectLessons, selectLessonsLoading } from "../lessonsSlice.ts";
import { fetchLessons } from "../lessonsThunk.ts";
import LessonDetailModal from "../components/LessonDetailModal/LessonDetailModal.tsx";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";

const LessonsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const lessons = useAppSelector(selectLessons);
  const loading = useAppSelector(selectLessonsLoading);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  const handleOpenModal = (lessonId: string) => {
    setSelectedLessonId(lessonId);
  };

  const handleCloseModal = () => {
    setSelectedLessonId(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container direction="column" spacing={3}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <Typography variant="h4">Уроки</Typography>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 4, md: 6 }}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              onClick={() => navigate("/create-lesson")}
            >
              Добавить урок
            </Button>
          </Grid>
        </Grid>

        {loading && (
          <Grid size={{ xs: 12 }} display="flex" justifyContent="center" mt={3}>
            <LoadingIndicator />
          </Grid>
        )}

        {!loading && lessons.length === 0 && (
          <Grid size={{ xs: 12 }} mt={3}>
            <Alert severity="info">Уроки отсутствуют</Alert>
          </Grid>
        )}

        {!loading && lessons.length > 0 && (
          <Grid container spacing={2} mt={3}>
            {lessons.map((lesson) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lesson._id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    border: "1px solid #ccc",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" title={lesson.title} noWrap>
                      {lesson.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Уровень группы: {lesson.groupLevel || "Не указано"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Кол-во участников: {lesson.quantityClients}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Возрастной лимит: {lesson.ageLimit || "Не указано"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      title={lesson.description || "Нет описания"}
                    >
                      {lesson.description || "Нет описания"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenModal(lesson._id)}
                      size="small"
                    >
                      Учет посещаемости
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedLessonId && (
          <LessonDetailModal
            lessonId={selectedLessonId}
            open={!!selectedLessonId}
            onClose={handleCloseModal}
          />
        )}
      </Grid>
    </Container>
  );
};

export default LessonsPage;
