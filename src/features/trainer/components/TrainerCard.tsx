import React from 'react';
import {Card, CardContent, CardHeader, CardMedia, Grid2, styled} from "@mui/material";
import {Link} from "react-router-dom";
import imageNotFound from '/src/assets/images/aaaa.jpg';
import {apiURL} from "../../../constants.ts";

const ImageCardMedia = styled(CardMedia)({
    width: '50%',
    height: 0,
    paddingTop: '56.25%',
    borderRadius: '10px',
    backgroundColor: 'silver',
});

const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

interface Props {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    experience: string;
}

const TrainerCard: React.FC<Props> = ({_id, firstName, lastName, avatar, experience}) => {
    let cardImage = imageNotFound;

    if (avatar) {
        cardImage = `${apiURL}/${avatar}`;
    }

    return (
        <>
            <Grid2 sx={{
                width: {
                    xs: '150px',
                    sm: '270px',
                },
            }}>
                <StyledLink to={`/trainer/${_id}`}>
                    <Card sx={{
                        height: '100%',
                        paddingTop: '24px',
                        backgroundColor: '#f0f0f0',
                    }}>
                        <Grid2 display="flex" justifyContent="center">
                            <ImageCardMedia image={cardImage} title={`${firstName} ${lastName}`} />
                        </Grid2>
                        <CardHeader title={`${firstName} ${lastName}`} />
                        <CardContent sx={{ paddingBottom: '0' }}>
                            {experience}
                        </CardContent>
                    </Card>
                </StyledLink>
            </Grid2>
        </>

    );
};

export default TrainerCard;