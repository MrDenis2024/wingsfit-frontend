import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {IGroup} from "../../../types/groupTypes.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    group: IGroup;
}

const CoursesGroupCards:React.FC<Props> = ({group}) => {

    const navigate = useNavigate();

    const handleClickGroup = (idGroup: string) => {
        navigate(`/groups/${idGroup}`);
    };

    return (
            <Card
                key={group._id}
                sx={{
                    width: "300px",
                }}
            >
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                        Уровень: {group.trainingLevel}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {group.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        Начало: {group.startTime}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        Время: {group.scheduleLength}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        Кол-во человек: {group.maxClients-group.clients.length}
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