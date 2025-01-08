import React, {useState} from 'react';
import {useAppSelector} from "../../../app/hooks.ts";
import {selectFetchingTrainers} from "../../trainers/trainersSlice.ts";
import CarouselSlider from "../../../UI/CarouselSlider/CarouselSlider.tsx";
import Grid from "@mui/material/Grid2";
import {Alert, useMediaQuery} from "@mui/material";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import { IMatchingGroup } from "../../../types/groupTypes.ts";
import GroupMatchingCard from "./GroupMatchingCard.tsx";

const groupsDataInToSlides = (
  groups: IMatchingGroup[],
  itemsPerSlide: number,
) => {
  const slides: IMatchingGroup[][] = [];
  for (let i = 0; i < groups.length; i += itemsPerSlide) {
    slides.push(groups.slice(i, i + itemsPerSlide));
  }
  return slides;
};

interface Props {
  groups: IMatchingGroup[];
  itemsPerSlide: number;
}

const GroupsMatchingCards: React.FC<Props> = ({ groups, itemsPerSlide }) => {
  const slides = groupsDataInToSlides(groups, itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLoading = useAppSelector(selectFetchingTrainers);
  const isSmall = useMediaQuery("(max-width: 840px)");
  const isMedium = useMediaQuery("(max-width: 1220px)");

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {!isLoading ? (
        groups.length > 0 ? (
          <CarouselSlider
            currentSlide={currentSlide}
            onHandleNext={handleNext}
            onHandlePrev={handlePrev}
          >
            {slides.map((slide, index) => (
              <Grid
                key={index}
                sx={{
                  minWidth: "100%",
                  padding: 2,
                  px: isMedium ? 2 : 6
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent={isSmall ? "space-evenly" : "stretch"}
                >
                  {slide.map((group) => (
                    <Grid key={group._id}
                          size={{ md: 4, lg: 4, sm: 6, xs: 12 }}
                          display="flex"
                          justifyContent="center"
                    >
                      <GroupMatchingCard
                        group={group}
                        isShort={false}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </CarouselSlider>
        ) : (
          <Alert severity="info" sx={{ width: "100%" }}>
            Нет доступных занятий!
          </Alert>
        )
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default GroupsMatchingCards;