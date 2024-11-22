import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import SignUpButton from "../buttons/SignUpButton.tsx";

interface Props {
  firstName: string;
  lastName: string;
  image: string;
  date: string;
  time: string;
  description: string;
}

const TrainingCard: React.FC<Props> = ({
  firstName,
  lastName,
  date,
  image,
  time,
  description,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardMedia component="img" image={image} alt="Training session" />

      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "#ff3300",
            fontWeight: 600,
            mb: 1,
            textTransform: "uppercase",
          }}
        >
          {date}, {time}
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
          Силовой тренинг с {firstName} {lastName}
        </Typography>

        <Typography variant="caption" color="textSecondary" sx={{ mb: 4 }}>
          {description}
        </Typography>

        <Box textAlign="left" sx={{ mt: 4 }}>
          <NavLink to="/login/client" style={{ textDecoration: "none" }}>
            <SignUpButton text={"Записаться"} />
          </NavLink>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrainingCard;
