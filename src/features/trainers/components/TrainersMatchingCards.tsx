import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import TrainerCard from './TrainerCard';
import {ITrainer} from "../../../types/trainerTypes.ts";
import CarouselSlider from "../../../UI/CarouselSlider/CarouselSlider.tsx";

const groupTrainersIntoSlides = (trainers: ITrainer[], itemsPerSlide: number) => {
  const slides: ITrainer[][] = [];
  for (let i = 0; i < trainers.length; i += itemsPerSlide) {
    slides.push(trainers.slice(i, i + itemsPerSlide));
  }
  return slides;
};

interface Props {
  trainers: ITrainer[]
}

const TrainersMatchingCards: React.FC<Props> = ({ trainers }) => {
  const itemsPerSlide = 3;
  const slides = groupTrainersIntoSlides(trainers, itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <CarouselSlider currentSlide={currentSlide} onHandleNext={handleNext} onHandlePrev={handlePrev} >
      {slides.map((slide, index) => (
        <Grid
          key={index}
          sx={{
            minWidth: '100%',
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
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
  );
};

export default TrainersMatchingCards;
