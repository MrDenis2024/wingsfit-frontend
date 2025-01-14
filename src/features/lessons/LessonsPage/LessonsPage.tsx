import { useEffect, useState } from "react";
import {
  Typography,
  Alert,
  Container, useMediaQuery,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import LessonDetailModal from "../components/LessonDetailModal/LessonDetailModal.tsx";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";
import {Lesson} from "../../../types/lessonTypes.ts";
import {fetchGroupLessons} from "../lessonsThunk.ts";
import {selectGroupLessons, selectGroupLessonsLoading} from "../lessonsSlice.ts";
import {getOneGroup} from "../../groups/groupsThunk.ts";
import {selectOneGroup, selectOneGroupLoading} from "../../groups/groupsSlice.ts";
import LessonsCards from "../components/LessonsCards.tsx";



const LessonsPage = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(selectGroupLessons);
  const loading = useAppSelector(selectGroupLessonsLoading);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const oneGroup = useAppSelector(selectOneGroup);
  const loadingOneGroup = useAppSelector(selectOneGroupLoading);
  const isSmall = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    dispatch(getOneGroup(id));
    dispatch(fetchGroupLessons(id));
  }, [dispatch, id]);

  const handleOpenModal = (lesson: Lesson) => setSelectedLesson(lesson);
  const handleCloseModal = () => setSelectedLesson(null);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid container direction="column" spacing={3}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {loadingOneGroup ? (
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center" mt={3}>
              <LoadingIndicator />
            </Grid>
          ) : oneGroup && (
            <>
              <Typography variant={isSmall ? "h5" : "h4" }>Посещаемость группы {oneGroup?.title}</Typography>
              <Grid size={{ xs: 12 }} display="flex" mt={1} flexDirection="column">
                <Typography variant="h6"><strong>Расписание:</strong> <span>{oneGroup.startTime}.</span> <span>{oneGroup.course.schedule.join(", ")}</span></Typography>
                <Typography variant="h6"><strong>Клиентов:</strong> {oneGroup.clients.length} / {oneGroup.maxClients}</Typography>
              </Grid>
            </>
          )}
        </Grid>
        <Grid size={{ xs: 12 }} mt={1}>
          <Typography variant="h5" marginBottom={0}>Список занятий</Typography>
        </Grid>


        {loading &&
            <Grid size={{xs: 12}} display="flex" justifyContent="center" mt={3}>
            <LoadingIndicator/>
          </Grid>}
        {!loading && lessons.length === 0 && (
          <Grid size={{ xs: 12 }} mt={3}>
            <Alert severity="info">Занятия у группы отсутствуют</Alert>
          </Grid>
        )}

        {!loading && oneGroup && lessons.length > 0 && (
          <LessonsCards
            onClick={handleOpenModal}
            lessons={lessons}
            group={oneGroup}
          />
        )}

        {selectedLesson && (
          <LessonDetailModal
            oneLesson={selectedLesson}
            open={!!selectedLesson}
            onClose={handleCloseModal}
          />
        )}
      </Grid>
    </Container>
  );
};

export default LessonsPage;
