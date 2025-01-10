import React from "react";
import { Avatar, Card, CardContent, styled } from "@mui/material";
import { Link } from "react-router-dom";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { apiURL } from "../../../constants.ts";
import Grid from "@mui/material/Grid2";

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

const TrainerCard: React.FC<Props> = ({ _id, firstName, lastName, avatar }) => {
  let cardImage = imageNotFound;

  if (avatar) {
    cardImage = `${apiURL}/${avatar}`;
  }

  return (
    <>
      <Grid
        width={{
          sm: "365px",
          md: "45%",
          lg: "350px",
          xs: "100%",
        }}
      >
        <StyledLink to={`/trainers/${_id}`}>
          <Card
            sx={{
              height: "100%",
              padding: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 70, height: 70 }}
              src={cardImage}
              alt={`${firstName} ${lastName}`}
            />
            <CardContent
              component="h5"
              sx={{
                fontWeight: "400",
                my: 0,
                fontSize: {
                  sm: "22px",
                  xs: "18px",
                },
              }}
            >
              <span>
                {firstName} {lastName}
              </span>
            </CardContent>
          </Card>
        </StyledLink>
      </Grid>
    </>
  );
};

export default TrainerCard;
