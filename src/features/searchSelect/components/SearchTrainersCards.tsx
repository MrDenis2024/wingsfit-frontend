import React from "react";
import Grid from "@mui/material/Grid2";
import SearchTrainerCard from "./SearchTrainerCard.tsx";
import { ITrainer } from "../../../types/trainerTypes.ts";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import { Alert } from "@mui/material";

interface Props {
  trainers: ITrainer[];
  isLoading: boolean;
}

const SearchTrainersCards: React.FC<Props> = ({ trainers, isLoading }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 5 }}
      display="flex"
      justifyContent={{ sm: "stretch", xs: "center" }}
    >
      {!isLoading ? (
        trainers.length > 0 ? (
          trainers.map((trainer) => (
            <Grid key={trainer._id} size={{ md: 4, lg: 4, sm: 6, xs: 12 }}>
              <SearchTrainerCard trainer={trainer} />
            </Grid>
          ))
        ) : (
          <Alert severity="info" sx={{ width: "100%" }}>
            Здесь пока нет ничего нет, выберите фильтры!
          </Alert>
        )
      ) : (
        <Grid display="flex" justifyContent="center" size={12}>
          <LoadingIndicator />
        </Grid>
      )}
    </Grid>
  );
};

export default SearchTrainersCards;
