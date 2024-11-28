import React from "react";
import { ITrainer } from "../../../types/trainerTypes.ts";
import TrainerCard from "./TrainerCard.tsx";
import { Grid2 } from "@mui/material";

interface Props {
  trainers: ITrainer[];
}

const TrainersCards: React.FC<Props> = ({ trainers }) => {
  console.log(trainers);
  return (
    <Grid2 container spacing={2}>
      {trainers.map((trainer) => {
        return (
          <TrainerCard
            key={trainer._id}
            _id={trainer.user._id}
            firstName={trainer.user.firstName}
            lastName={trainer.user.lastName}
            avatar={trainer.user.avatar}
            experience={trainer.experience}
          />
        );
      })}
    </Grid2>
  );
};

export default TrainersCards;
