import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
  id: string;
}

const RaitingAndReviews: React.FC<Props> = ({ id }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ECECEC",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <StarIcon sx={{ fontSize: "small", marginRight: 0.5 }} />
          <span style={{ fontSize: "12px" }}>4.5</span>
        </Box>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            component={Link}
            to={`/trainers/reviews/${id}`}
            sx={{ fontSize: "12px", color: "black", display: "flex" }}
          >
            Based on 25 reviews
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginTop: "10px",
            fontSize: "11px",
            color: "black",
            display: "flex",
          }}
        >
          "Inna is an amazing trainer! Her workouts are challenging but fun.
          Highly recommended!"
        </Typography>
      </Box>
    </Box>
  );
};

export default RaitingAndReviews;
