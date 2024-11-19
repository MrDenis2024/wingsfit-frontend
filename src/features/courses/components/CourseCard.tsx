import React from "react";
import {Button, Card, CardContent, CardHeader, CardMedia, Grid2, styled} from "@mui/material";
import {ICourse} from "../../../types/courseTypes.ts";
import {NavLink} from "react-router-dom";
import {apiURL} from "../../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";

const ImageCardMedia = styled(CardMedia)({
  width: "38%",
  height: 0,
  paddingTop: "38.25%",
  borderRadius: "10px",
  backgroundColor: "silver",
});

interface Props {
  course: ICourse;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  let cardImage = imageNotFound;

  if (course.image) {
    cardImage = `${apiURL}/${course.image}`;
    console.log(course.image);
  }
  return (
    <Grid2
      sx={{
        width: {
          xs: "320px",
        },
      }}
    >
      <Card
        sx={{
          height: "100%",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f0f0f0",
          borderRadius: "12px",
        }}
      >
        <Grid2 container spacing={1} alignItems="center">
          <ImageCardMedia
            image={cardImage}
            title={`${course.title}`}
          />
          <Grid2 alignItems="start">
            <CardHeader
              title={`${course.title}`}
              sx={{ textAlign: "center", padding: 0 }}
            />
            <CardContent
              sx={{
                "&:last-child": {
                  padding: 0,
                },
              }}
            >
              {course.courseTypes}
            </CardContent>
          </Grid2>
        </Grid2>
        <Grid2
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <CardContent sx={{ textAlign: "center", padding: "16px 0" }}>
            {course.schedule}
          </CardContent>
          <Grid2 container spacing={1}>
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textTransform: "none",
                backgroundColor: "#151515",
                color: "#f0f0f0",
                "&:hover": { backgroundColor: "#303030" },
                borderRadius: "10px",
                height: "40px",
              }}
              component={NavLink}
              to={`/courses/${course._id}`}
            >
              <span style={{ lineHeight: 1 }}>learn</span>
              <span style={{ lineHeight: 1 }}>more</span>
            </Button>
          </Grid2>
        </Grid2>
      </Card>
    </Grid2>
  );
};

export default CourseCard;