import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TrainerCard from './TrainerCard';
import {ITrainer} from "../../../types/trainerTypes.ts";
import CarouselSlider from "../../../UI/CarouselSlider/CarouselSlider.tsx";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectFetchingTrainers} from "../trainersSlice.ts";
import {Alert} from "@mui/material";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";

const groupTrainersIntoSlides = (trainers: ITrainer[], itemsPerSlide: number) => {
  const slides: ITrainer[][] = [];
  for (let i = 0; i < trainers.length; i += itemsPerSlide) {
    slides.push(trainers.slice(i, i + itemsPerSlide));
  }
  return slides;
};

interface Props {
  trainers: ITrainer[];
  itemsPerSlide: number;
}

const TrainersMatchingCards: React.FC<Props> = ({ trainers, itemsPerSlide }) => {
  const slides = groupTrainersIntoSlides(trainers, itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLoading = useAppSelector(selectFetchingTrainers);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {!isLoading ? (
        trainers.length > 0 ? (
          <CarouselSlider currentSlide={currentSlide} onHandleNext={handleNext} onHandlePrev={handlePrev} >
            {slides.map((slide, index) => (
              <Grid
                key={index}
                sx={{
                  minWidth: '100%',
                  padding: 2,
                }}
              >
                <Grid container spacing={2} justifyContent="space-around">
                  {slide.map((trainer) => (
                    <TrainerCard
                      key={trainer._id}
                      _id={trainer.user._id}
                      firstName={trainer.user.firstName}
                      lastName={trainer.user.lastName}
                      avatar={trainer.user.avatar}
                    />
                  ))}
                </Grid>
              </Grid>
            ))}
          </CarouselSlider>
        ) : (
          <Alert severity="info" sx={{ width: "100%" }}>
            Нет доступных тренеров!
          </Alert>
        )
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default TrainersMatchingCards;
