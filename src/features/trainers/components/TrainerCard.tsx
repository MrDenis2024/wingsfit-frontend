import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  styled,
} from "@mui/material";
import {Link} from "react-router-dom";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import {apiURL} from "../../../constants.ts";
import Grid from "@mui/material/Grid2";

// const ImageCardMedia = styled(CardMedia)({
//   width: "50%",
//   height: 0,
//   paddingTop: "56.25%",
//   borderRadius: "10px",
//   backgroundColor: "silver",
// });

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
});

interface Props {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

const TrainerCard: React.FC<Props> = ({
  _id,
  firstName,
  lastName,
  avatar,
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
            xs: "250px",
            sm: "360px",
          },
        }}
      >
        <StyledLink to={`/trainers/${_id}`}>
          <Card
            sx={{
              height: "100%",
              padding: "20px",
              display: "flex",
            }}
          >
            <Avatar
              sx={{width: 100, height: 100}}
              src={cardImage}
              alt={`${firstName} ${lastName}`}
            />
            <CardHeader title={`${firstName} ${lastName}`}/>
          </Card>
        </StyledLink>
      </Grid>
    </>
  );
};

export default TrainerCard;
