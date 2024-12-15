import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import { ICourse } from "../../../types/courseTypes.ts";
import { NavLink } from "react-router-dom";
import { apiURL } from "../../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import { selectUser } from "../../users/userSlice.ts";
import Grid from "@mui/material/Grid2";

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
          component={NavLink}
          to={`/courses/${course._id}`}
          title={`${course.title}`}
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
                  {findCourseTypes(course.courseType.id)}
                </Typography>
                <Typography variant="body2" sx={{ padding: "5px 0" }}>
                  {course.schedule}
                </Typography>
                <Typography variant="body2">Цена: {course.price}</Typography>
                <Typography
                  variant="body2"
                  sx={{ padding: "5px 0" }}
                  flexDirection="column"
                  display="flex"
                >
                  <span>Ограничение: {course.maxClients} человек</span>
                  <span>Формат: {course.format}</span>
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
