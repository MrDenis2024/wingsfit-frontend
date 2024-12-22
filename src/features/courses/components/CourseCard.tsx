import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { ICourse } from "../../../types/courseTypes.ts";
import { Link, NavLink } from "react-router-dom";
import { apiURL } from "../../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import { selectUser } from "../../users/userSlice.ts";
import Grid from "@mui/material/Grid2";
import BorderColorIcon from "@mui/icons-material/BorderColor";

interface Props {
  course: ICourse;
  isShort?: boolean;
}

const CourseCard: React.FC<Props> = ({ course, isShort }) => {
  const user = useAppSelector(selectUser);
  let cardImage = imageNotFound;
  const courseTypes = useAppSelector(selectCourseTypes);

  const findCourseTypes = (typeId: string) => {
    return courseTypes
      .filter((course) => course._id === typeId)
      .map((course) => course.name);
  };

  if (course.image) {
    cardImage = `${apiURL}/${course.image}`;
  }

  const dayAbbreviations: { [key: string]: string } = {
    Понедельник: "Пн",
    Вторник: "Вт",
    Среда: "Ср",
    Четверг: "Четв",
    Пятница: "Пят",
    Суббота: "Суб",
    Воскресенье: "Вс",
  };

  return (
    <Card sx={{ maxWidth: 345, height: "100%", border: "1px solid silver" }}>
      <CardHeader
        title={
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography
              component={NavLink}
              to={`/courses/${course._id}`}
              variant="h6"
              sx={{ color: "#1a3b7e", textDecoration: "none" }}
            >
              {course.title}
            </Typography>
            {course.user._id === user?._id && (
              <Link
                to={`/edit-course/${course._id}`}
                style={{ textDecoration: "none" }}
              >
                <IconButton
                  sx={{
                    color: "#0288D1",
                    borderColor: "#0288D1",
                    "&:hover": {
                      backgroundColor: "#dff3fc",
                      borderColor: "#0288D1",
                    },
                    ml: 1,
                  }}
                >
                  <BorderColorIcon />
                </IconButton>
              </Link>
            )}
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
        to={`/courses/${course._id}`}
        sx={{ height: "100%" }}
      >
        <CardMedia
          component="img"
          height="220"
          image={cardImage}
          alt="Course Image"
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" textAlign="center">
            {course.schedule
              .map((day) => {
                return dayAbbreviations[day] || day;
              })
              .join(", ")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Тренер: {course.user.firstName} {course.user.lastName}
          </Typography>
          <Typography variant="body2">
            О курсе - {course.description}
          </Typography>
          {!isShort && (
            <>
              <Typography variant="body2" color="textSecondary">
                Тип занятий: {findCourseTypes(course.courseType._id)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Цена: {course.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Формат:{" "}
                {course.format === "single" ? "индивидуальные" : "групповые"}{" "}
                тренировки
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
