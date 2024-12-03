import React from "react";
import { ICourse } from "../../../types/courseTypes.ts";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { apiURL } from "../../../constants.ts";
import placeholderImage from "../../../assets/images/user-icon-not-found.png";

interface Props {
  courses: ICourse;
}

const UpdTrainerCard: React.FC<Props> = ({ courses }) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardMedia
        component="img"
        image={courses.image ? `${apiURL}/${courses.image}` : placeholderImage}
        alt={courses.image ? "Training session" : "Placeholder image"}
        sx={{ height: 180, objectFit: "cover" }}
      />

      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "#ff3300",
            fontWeight: 600,
            mb: 1,
            textTransform: "uppercase",
          }}
        >
          {courses.schedule ? courses.schedule : "Расписание пока не указано"}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          {courses.title
            ? `${courses.title} с ${courses.user.firstName} ${courses.user.lastName}`
            : `${courses.user.firstName} ${courses.user.lastName}`}
        </Typography>

        <Typography variant="caption" color="textSecondary" sx={{ mb: 4 }}>
          {courses.description
            ? courses.description
            : "Описание курса отсутствует."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UpdTrainerCard;
