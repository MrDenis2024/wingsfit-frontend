import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IGroup } from "../../../types/groupTypes.ts";
import Grid from "@mui/material/Grid2";

interface Props {
  group: IGroup;
}

const GroupCard: React.FC<Props> = ({ group }) => {
  return (
    <Card
      sx={{
        m: 1,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderRadius: "7px",
        border: "1px solid silver",
      }}
    >
      <Grid flexDirection="column">
        <CardHeader
          component={NavLink}
          to={`/courses/${group.course._id}`}
          title={`${group.title}`}
          sx={{
            padding: "0 0 20px 0",
            color: "#1a3b7e",
            textDecoration: "none",
          }}
        />
        <Grid>
          <CardContent
            sx={{
              "&:last-child": {
                padding: 0,
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid size={8} mb={3} flexDirection="column">
                <Typography variant="body2" color="textSecondary">
                  {group.course.title}
                </Typography>
                <Typography variant="body2" sx={{ padding: "5px 0" }}>
                  Начало:{group.startTime}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ padding: "5px 0" }}
                  flexDirection="column"
                  display="flex"
                >
                  <span>
                    Доступно: {group.clientsLimit - group.clients.length}
                  </span>
                  <span>Уровень: {group.trainingLevel}</span>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default GroupCard;
