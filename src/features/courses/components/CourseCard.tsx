import React from "react";
import {Button, Card, CardContent, CardHeader, CardMedia, Grid2, styled, Typography} from "@mui/material";
import {ICourse} from "../../../types/courseTypes.ts";
import {NavLink} from "react-router-dom";
import {apiURL} from "../../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectCourseTypes} from "../../CourseTypes/CourseTypesSlice.ts";

const ImageCardMedia = styled(CardMedia)({
  width: "100%",
  height: "140px",
  borderRadius: "5px",
  backgroundColor: "silver",
});

interface Props {
  course: ICourse;
}

const CourseCard: React.FC<Props> = ({course}) => {
  let cardImage = imageNotFound;
  const courseTypes = useAppSelector(selectCourseTypes);

  const findCourseTypes = (typeId: string) => {
    return courseTypes
      .filter(course => course._id === typeId)
      .map(course => course.name);
  };

  if (course.image) {
    cardImage = `${apiURL}/${course.image}`;
  }

  return (
    <Grid2
      sx={{
        width: {
          xs: "375px",
        },
      }}
    >
      <Card
        sx={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          borderRadius: "7px",
        }}
      >
        <Grid2 flexDirection="column">
          <CardHeader component={NavLink} to={`/courses/${course._id}`}
            title={`${course.title}`}
            sx={{
              padding: "0 0 20px 0",
              color: "#1b1818",
              textDecoration: "none"
          }}
          />
          <Grid2>
            <CardContent
              sx={{
                "&:last-child": {
                  padding: 0,
                },
              }}
            >
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <ImageCardMedia
                    image={cardImage}
                    title={course.title}
                  />
                </Grid2>
                <Grid2 size={6} mb={3} flexDirection="column">
                  <Typography variant="body2" color="textSecondary">
                    {findCourseTypes(course.courseType)}
                  </Typography>
                  <Typography variant="body2" sx={{padding: "5px 0"}}>
                    {course.schedule}
                  </Typography>
                  <Typography variant="body2">
                    Price: {course.price}
                  </Typography>
                  <Typography variant="body2" sx={{padding: "5px 0"}} flexDirection="column" display="flex">
                    <span>Available: {course.maxClients}</span>
                    <span>Format: {course.format}</span>
                  </Typography>
                </Grid2>
              </Grid2>
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textTransform: "none",
                  backgroundColor: "#4d80fa",
                  color: "#f0f0f0",
                  "&:hover": {backgroundColor: "#0a2375"},
                  borderRadius: "10px",
                }}
                component={NavLink}
                to={`/courses/${course._id}`}
              >
                <span>Try free</span>
              </Button>
            </CardContent>
          </Grid2>
        </Grid2>
      </Card>
    </Grid2>
  );
};

export default CourseCard;