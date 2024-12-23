import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  group: IGroup;
}

const GroupCard: React.FC<Props> = ({ group }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{group.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ sm: 4, xs: 12 }}>
                <Typography
                  variant="body2"
                  textAlign={{ sm: "start", xs: "center" }}
                >
                  Уровень: {group.trainingLevel}
                </Typography>
              </Grid>
              <Grid size={{ sm: 4, xs: 12 }}>
                <Typography
                  variant="body2"
                  textAlign={{ sm: "center", xs: "center" }}
                >
                  Начало:{group.startTime}, длительность: {group.scheduleLength}{" "}
                  {group.scheduleLength === 5
                    ? "часов"
                    : group.scheduleLength > 1
                      ? "часа"
                      : "час"}
                </Typography>
              </Grid>
              <Grid
                size={{ sm: 4, xs: 12 }}
                textAlign={{ sm: "end", xs: "center" }}
              >
                <Typography variant="body2">
                  Доступно: {group.maxClients - group.clients.length}/
                  {group.maxClients}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </AccordionDetails>
    </Accordion>
  );
};

export default GroupCard;
