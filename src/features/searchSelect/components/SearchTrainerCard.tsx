import {ITrainer} from "../../../types/trainerTypes.ts";
import React from "react";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {NavLink} from "react-router-dom";
import {apiURL, findCourseTypes} from "../../../constants.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectCourseTypes} from "../../CourseTypes/CourseTypesSlice.ts";


interface Props {
  trainer: ITrainer;
}

const SearchTrainerCard: React.FC<Props> = ({trainer}) => {
  let cardImage = imageNotFound;
  const courseTypes = useAppSelector(selectCourseTypes);


  const findTypes = findCourseTypes(courseTypes, ...trainer.courseTypes);

  if (trainer.user.avatar) {
    cardImage = `${apiURL}/${trainer.user.avatar}`;
  }

  return (
    <>
      <Card sx={{ height: "100%", border: "1px solid silver"}}>
        <CardActionArea
          component={NavLink}
          to={`/trainers/${trainer.user._id}`}
        >
          <CardMedia
            component="img"
            sx={{
              height: "300px",
              objectFit: "cover",
              objectPosition: "top",
            }}
            image={cardImage}
            alt={trainer.user.firstName + " " + trainer.user.lastName}
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
                  sx={{color: "#1a3b7e", textDecoration: "none", fontSize: '18px'}}
                >
                  {trainer.user.firstName} {trainer.user.lastName}
                </Typography>
              </Grid>
            }
            sx={{
              py: 1,
              color: "#1a3b7e",
              textDecoration: "none",
            }}
          />

          <CardContent sx={{ pt: 0, mt: 0 }}>
            <Typography variant="body1">
              Направления: {findTypes.map((type) => (
                <span key={type._id}>{type.name}</span>
            ))}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              textAlign="center"
            >
              {trainer.availableDays?.join(", ")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default SearchTrainerCard;
