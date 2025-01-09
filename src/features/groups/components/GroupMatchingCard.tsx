import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { apiURL } from "../../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import Grid from "@mui/material/Grid2";
import { IMatchingGroup } from "../../../types/groupTypes.ts";

interface Props {
  group: IMatchingGroup;
}

const GroupMatchingCard: React.FC<Props> = ({ group }) => {
  let cardImage = imageNotFound;

  if (group.course.image) {
    cardImage = `${apiURL}/${group.course.image}`;
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, height: "100%", border: "1px solid silver" }}>
        <CardActionArea
          component={NavLink}
          to={`/courses/${group.course._id}`}
          sx={{ height: "100%" }}
        >
          <CardMedia
            component="img"
            height="220"
            image={cardImage}
            alt={group.course.title}
          />
          <CardHeader
            title={
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#1a3b7e", textDecoration: "none" }}
                >
                  {group.title}
                </Typography>
              </Grid>
            }
            sx={{
              color: "#1a3b7e",
              textDecoration: "none",
              mb: 0,
              pb: 1,
            }}
          />
          <CardContent sx={{ margin: 0, paddingTop: 0 }}>
            <Typography
              variant="body1"
              color="textSecondary"
              textAlign="center"
              mb={1}
            >
              {group.course.schedule.join(", ")}
            </Typography>
            <Typography variant="body2">Курс - {group.course.title}</Typography>
            <Typography variant="body2">
              Тренер: {group.course.user.firstName} {group.course.user.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Тип занятий:{" "}
              {group.course.courseType.name.charAt(0).toUpperCase() +
                group.course.courseType.name.slice(1)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Формат:{" "}
              {group.course.format === "single"
                ? "индивидуальные"
                : "групповые"}{" "}
              тренировки
            </Typography>
            <Typography variant="body2">Цена: {group.course.price}</Typography>
            <Typography variant="body2">
              Количество доступных мест: {group.maxClients - group.clients.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default GroupMatchingCard;
