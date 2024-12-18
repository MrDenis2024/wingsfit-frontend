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
            sm: "360px",
            xs: "100%",
          },
        }}
      >
        <StyledLink to={`/trainers/${_id}`}>
          <Card
            sx={{
              height: "100%",
              padding: "15px",
              display: "flex",
            }}
          >
            <Avatar
              sx={{width: 70, height: 70, mt: 2}}
              src={cardImage}
              alt={`${firstName} ${lastName}`}
            />
            <CardHeader variant="h6" title={`${firstName} ${lastName}`}/>
          </Card>
        </StyledLink>
      </Grid>
    </>
  );
};

export default TrainerCard;
