import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  group: IGroup;
}

const CoursesGroupCards: React.FC<Props> = ({ group }) => {
  const navigate = useNavigate();
  const mediaQuery500 = useMediaQuery("(min-width:500px)");

  const handleClickGroup = (idGroup: string) => {
    navigate(`/groups/${idGroup}`);
  };

  return (
    <Card
      sx={{
        width: mediaQuery500 ? "100%" : "210px",
        display: mediaQuery500 ? "flex" : "block",
        justifyContent: "space-between",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: mediaQuery500 ? "row" : "column",
          gap: mediaQuery500 ? "20px" : "10px",
          flexWrap: "wrap",
          alignItems: mediaQuery500 ? "center" : "start",
        }}
      >
        <Typography variant="h5" sx={{ fontSize: "16px" }} component="div">
          {group.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Уровень: {group.trainingLevel}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Начало: {group.startTime}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Время: {group.scheduleLength}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Кол-во человек: {group.maxClients - group.clients.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => handleClickGroup(group._id)}
        >
          Вступить в группу
        </Button>
      </CardActions>
    </Card>
  );
};

export default CoursesGroupCards;
