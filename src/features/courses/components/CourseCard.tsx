import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  styled,
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

const ImageCardMedia = styled(CardMedia)({
  width: "100%",
  height: "115px",
  borderRadius: "5px",
  border: "1px solid silver",
});

interface Props {
  course: ICourse;
}

const CourseCard: React.FC<Props> = ({ course }) => {
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

  console.log(course.schedule);

  return (
    <Card
      sx={{
        m: 1,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderRadius: "7px",
        border: "1px solid silver",
      }}
    >
      <Grid flexDirection="column">
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
            padding: "0 0 20px 0",
            color: "#1a3b7e",
            textDecoration: "none",
          }}
        />
        <Grid>
          <CardContent
            sx={{
              "&:last-child": {
                padding: 0,
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid size={5}>
                <ImageCardMedia image={cardImage} title={course.title} />
              </Grid>
              <Grid size={7} mb={3} flexDirection="column">
                <Typography variant="body2" color="textSecondary">
                  {findCourseTypes(course.courseType._id)}
                </Typography>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "4px",
                    paddingBottom: "5px",
                  }}
                >
                  {course.schedule.map((day, index) => (
                    <Typography key={index} variant="body2">
                      {dayAbbreviations[day] || day}
                    </Typography>
                  ))}
                </Grid>
                <Typography variant="body2">Цена: {course.price}</Typography>
                <Typography
                  variant="body2"
                  sx={{ padding: "5px 0" }}
                  flexDirection="column"
                  display="flex"
                >
                  Формат: {course.format}
                </Typography>
              </Grid>
            </Grid>
            {user?.role === "client" && (
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textTransform: "none",
                  backgroundColor: "#4d80fa",
                  color: "#f0f0f0",
                  "&:hover": { backgroundColor: "#0a2375" },
                  borderRadius: "10px",
                  marginTop: "5px",
                }}
                component={NavLink}
                to={`/courses/${course._id}`}
              >
                <span>Попробовать</span>
              </Button>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CourseCard;
