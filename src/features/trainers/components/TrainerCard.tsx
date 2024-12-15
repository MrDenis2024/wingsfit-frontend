import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { apiURL } from "../../../constants.ts";
import Grid from "@mui/material/Grid2";

const ImageCardMedia = styled(CardMedia)({
  width: "50%",
  height: 0,
  paddingTop: "56.25%",
  borderRadius: "10px",
  backgroundColor: "silver",
});

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

interface Props {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  experience?: string;
}

const TrainerCard: React.FC<Props> = ({
  _id,
  firstName,
  lastName,
  avatar,
  experience,
}) => {
  let cardImage = imageNotFound;

  if (avatar) {
    cardImage = `${apiURL}/${avatar}`;
  }

  return (
    <>
      <Grid
        sx={{
          width: {
            xs: "150px",
            sm: "270px",
          },
        }}
      >
        <StyledLink to={`/trainers/${_id}`}>
          <Card
            sx={{
              height: "100%",
              paddingTop: "24px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <Grid display="flex" justifyContent="center">
              <ImageCardMedia
                image={cardImage}
                title={`${firstName} ${lastName}`}
              />
            </Grid>
            <CardHeader title={`${firstName} ${lastName}`} />
            <CardContent sx={{ paddingBottom: "0" }}>{experience}</CardContent>
          </Card>
        </StyledLink>
      </Grid>
    </>
  );
};

export default TrainerCard;
