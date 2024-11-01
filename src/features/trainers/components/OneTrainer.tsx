import {Box, Button, CardMedia, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import RaitingAndReviews from "./RaitingAndReviews.tsx";

const OneTrainer = () => {

    const {id} = useParams() as {id: string};
    console.log(id);
    return (
        <Box>
            <Box>
                <CardMedia
                    component="img"
                    image="https://img.freepik.com/free-photo/trainer-man-lying-lifting-dumbbells-gym_1262-16635.jpg"
                    alt="Фото тренера"
                    sx={{ borderRadius: '10px', width: 280, height: 150, margin:'25px auto' }}
                />
            </Box>
            <Box sx={{width:'270px' , margin:'0px auto'}}>
                <Typography variant="h5" sx={{ marginTop: 1 , color: 'black' , fontWeight: '700' }}>
                    Inna Poliak
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 , fontSize: '12px', color: 'black' }}>
                    Certified Personal Trainer
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontSize: '12px', color: 'black' }}>
                    University of Fitness Sciences
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontSize: '12px', color: 'black', lineHeight:'normal' }}>
                    Passionate about helping individuals achieve their fitness goals through personalized training programs.
                </Typography>
            </Box>
            <Box sx={{ width:'270px' , margin:'10px auto'}}>
                <Typography variant="h6" sx={{ marginTop: 1 , color: 'black' , fontWeight: '700' }}>
                    Calendar Schedule
                </Typography>
                <Box sx={{backgroundColor:'#ECECEC', padding:'20px', borderRadius:'10px', marginTop:'10px'}}>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 , fontSize: '12px', color: 'black' }}>
                        Cardio - 8:00 AM
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: '12px', color: 'black' }}>
                        Zumba - 10:00 AM
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: '12px', color: 'black' }}>
                        Strenght Training - 6:00 PM
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ width:'270px' , margin:'10px auto'}}>
                <Typography variant="h6" sx={{ marginTop: 1 , color: 'black' , fontWeight: '700' }}>
                    Raiting and Reviews
                </Typography>
                <Box>
                    <RaitingAndReviews id={id} />
                </Box>
            </Box>
            <Box sx={{display:'flex' , flexDirection:'column' , width:'270px', margin: '0 auto' , gap:'15px' , marginTop:'25px'}}>
                <Button variant="outlined" sx={{color:'black' , borderColor:'black', borderRadius:'7px'}}>Chat with Trainer</Button>
                <Button variant="outlined" sx={{color:'black' , borderColor:'black' , borderRadius:'7px'}}>Book trial class</Button>
            </Box>
        </Box>
    );
};

export default OneTrainer;