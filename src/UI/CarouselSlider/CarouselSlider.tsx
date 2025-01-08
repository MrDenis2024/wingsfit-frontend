import React from "react";
import Grid from "@mui/material/Grid2";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';

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
        boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.2)",
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
        <ArrowBackIosNewIcon />
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
