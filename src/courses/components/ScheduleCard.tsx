import React from 'react';
import {Button, Card, CardContent, CardHeader, CardMedia, Grid2, styled} from "@mui/material";
import { NavLink} from "react-router-dom";
import imageNotFound from '/src/assets/images/user-icon-not-found.png';
import {apiURL} from "../../constants.ts";

const ImageCardMedia = styled(CardMedia)({
    width: '38%',
    height: 0,
    paddingTop: '38.25%',
    borderRadius: '10px',
    backgroundColor: 'silver',
});

interface Props {
    _id: string;
    firstName: string;
    lastName: string;
    courseType: string;
    avatar: string | null;
    workTime: string;
}

const ScheduleCard: React.FC<Props> = ({_id, firstName, lastName,courseType, avatar, workTime}) => {
    let cardImage = imageNotFound;

    if (avatar) {
        cardImage = `${apiURL}/${avatar}`;
    }

    const handleSubscriptionClass = () => {
        console.log(`subscription to classes${_id}`);
    };

    return (
        <Grid2
            sx={{
                width: {
                    xs: '320px',

                },
            }}
        >
            <Card sx={{
                height: '100%',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
            }}>
                <Grid2 container spacing={1} alignItems="center">
                <ImageCardMedia image={cardImage} title={`${firstName} ${lastName}`} />
                    <Grid2 alignItems='start'>
                        <CardHeader
                            title={`${firstName} ${lastName}`}
                            sx={{ textAlign: 'center', padding: 0 }}
                        />
                        <CardContent sx={{
                            '&:last-child': {
                                padding: 0,
                            }
                        }}>
                            {courseType}
                        </CardContent>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={1} justifyContent="space-between" alignItems='center'>
                    <CardContent sx={{ textAlign: 'center', padding: '16px 0' }}>
                        {workTime}
                    </CardContent>
                    <Grid2 container spacing={1} >
                        <Button
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textTransform: 'none',
                                backgroundColor: '#151515',
                                color: '#f0f0f0',
                                '&:hover': {backgroundColor: '#303030'},
                                borderRadius: '10px',
                                height: '40px',
                            }}
                            component={NavLink}
                            to={`/class/${_id}`}
                        >
                            <span style={{lineHeight: 1}}>learn</span>
                            <span style={{lineHeight: 1}}>more</span>
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: '#151515',
                                color: '#f0f0f0',
                                textTransform: 'none',
                                '&:hover': {backgroundColor: '#303030'},
                                borderRadius: '10px',
                                height: '40px',
                            }}
                            variant="contained"
                            color="primary"
                            onClick={handleSubscriptionClass}
                        >
                            <span style={{lineHeight: 1}}>Join</span>
                        </Button>
                    </Grid2>
                </Grid2>
            </Card>
        </Grid2>
    );
};

export default ScheduleCard;