import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Typography } from "@mui/material";
import { Lesson } from "../../../types/lessonTypes.ts";
import { IGroup } from "../../../types/groupTypes.ts";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.extend(localizedFormat);
dayjs.locale("ru");

interface Props {
  onClick: (lesson: Lesson) => void;
  lessons: Lesson[];
  group: IGroup;
}

const LessonsCards: React.FC<Props> = ({ onClick, lessons, group }) => {
  return (
    <Grid container spacing={2} mt={1}>
      {lessons.map((lesson) => (
        <Grid
          key={lesson._id}
          onClick={() => onClick(lesson)}
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              border: "1px solid #ccc",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontSize="16px">
                {dayjs(lesson.createdAt).format("dddd, MMMM - D, YYYY")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Количество посетивших: {lesson.arePresent.length}/
                {group.clients.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LessonsCards;
