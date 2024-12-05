import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const ChartStatistic = () => {
  return (
    <Grid>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Статистика посещений
      </Typography>
      <Grid display="flex">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
          series={[
            {
              data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
              showMark: ({ index }) => index % 2 === 0,
            },
          ]}
          width={700}
          height={500}
        />
      </Grid>
    </Grid>
  );
};

export default ChartStatistic;
