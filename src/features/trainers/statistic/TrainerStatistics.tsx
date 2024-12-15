import React from "react";
import TrainerStatisticMenu from "./components/TrainerStatisticMenu.tsx";
import Grid from "@mui/material/Grid2";
import { Alert, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import ClientStatistic from "./components/ClientStatistic.tsx";
import GroupStatistic from "./components/GroupStatistic.tsx";
import ChartStatistic from "./components/ChartStatistic.tsx";

const TrainerStatistics = () => {
  const { pathname: location } = useLocation();
  const lastWord = location.split("/").pop();

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: "100%" }}>
      Выбирите статистику
    </Alert>
  );

  if (lastWord === "groups") {
    content = <GroupStatistic />;
  } else if (lastWord === "clients") {
    content = <ClientStatistic />;
  } else if (lastWord === "chart") {
    content = <ChartStatistic />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container direction="column">
        <Grid>
          <TrainerStatisticMenu />
        </Grid>
        <Grid>{content}</Grid>
      </Grid>
    </Container>
  );
};

export default TrainerStatistics;
