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
  isShort: boolean;
}

const GroupMatchingCard: React.FC<Props> = ({ group, isShort }) => {
  let cardImage = imageNotFound;

  if (group.course.image) {
    cardImage = `${apiURL}/${group.course.image}`;
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, height: "100%", border: "1px solid silver" }}>
        <CardHeader
          title={
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography
                component={NavLink}
                to={`/courses/${group.course._id}`}
                variant="h6"
                sx={{ color: "#1a3b7e", textDecoration: "none" }}
              >
                {group.title}
              </Typography>
            </Grid>
          }
          sx={{
            p: 1,
            color: "#1a3b7e",
            textDecoration: "none",
          }}
        />
        <CardActionArea
          component={NavLink}
          to={`/courses/${group.course._id}`}
          sx={{ height: "100%" }}
        >
          <CardMedia
            component="img"
            height="220"
            image={cardImage}
            alt="Course Image"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="textSecondary"
              textAlign="center"
            >
              {group.course.schedule.join(", ")}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Тренер: {group.course.user.firstName} {group.course.user.lastName}
            </Typography>
            <Typography variant="body2">
              О курсе - {group.course.description}
            </Typography>
            {!isShort && (
              <>
                <Typography variant="body2" color="textSecondary">
                  Тип занятий:{" "}
                  {group.course.courseType.name.charAt(0).toUpperCase() +
                    group.course.courseType.name.slice(1)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Цена: {group.course.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Формат:{" "}
                  {group.course.format === "single" ? "индивидуальные" : "групповые"}{" "}
                  тренировки
                </Typography>
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default GroupMatchingCard;
