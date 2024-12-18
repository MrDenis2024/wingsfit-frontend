import React from "react";
import Grid from "@mui/material/Grid2";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface Props extends React.PropsWithChildren {
  onHandleNext: VoidFunction;
  onHandlePrev: VoidFunction;
  currentSlide: number;
}

const CarouselSlider: React.FC<Props> = ({
  children,
  currentSlide,
  onHandleNext,
  onHandlePrev,
}) => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        position: "relative",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Grid
        sx={{
          display: "flex",
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {children}
      </Grid>
      <IconButton
        onClick={onHandlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "white",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={onHandleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "white",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Grid>
  );
};

export default CarouselSlider;
