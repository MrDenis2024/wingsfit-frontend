import { useEffect, useState } from "react";
import {
  Typography,
  Alert,
  Container,
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
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <Typography variant="h4">Посещаемость группы</Typography>
          </Grid>
        </Grid>

        {loadingOneGroup && (
          <Grid size={{ xs: 12 }} display="flex" justifyContent="center" mt={3}>
            <LoadingIndicator />
          </Grid>
        )}
        <Grid size={{ xs: 12 }} my={0}>
          <Typography variant="h5" marginBottom={0}>Занятия</Typography>
        </Grid>
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
