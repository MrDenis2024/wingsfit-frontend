import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectClientProfile} from "../clientSlice.ts";
import {getClientProfile} from "../clientThunk.ts";
import {Box, Button, CardMedia, Typography} from "@mui/material";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";

const OneClient = () => {
    const { id } = useParams() as { id: string };

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector(selectClientProfile);

    useEffect(() => {
        dispatch(getClientProfile(id))
    }, [dispatch]);

    useEffect(() => {
        console.log(userProfile);
    }, [userProfile]);
    return (
        <div>
            <Box>
                <Box>
                    <CardMedia
                        component="img"
                        image={imageNotFound}
                        alt="Фото тренера"
                        sx={{
                            borderRadius: "10px",
                            width: 150,
                            height: 150,
                            margin: "25px auto",
                        }}
                    />

                </Box>
                <Box sx={{ width: "270px", margin: "0px auto" }}>
                    <Typography
                        variant="h5"
                        sx={{ marginTop: 1, color: "black", fontWeight: "700" }}
                    >
                        {userProfile?.user.firstName} {userProfile?.user.lastName}
                    </Typography>
                    <Box sx={{margin:'15px 0'}}>
                        <p style={{margin:0}}>User information</p>
                        <Typography variant="body2" color="text.secondary">
                            Phone number: <strong>{userProfile?.user.phoneNumber}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Date of Birth: <strong>{userProfile?.dateOfBirth.slice(0,10)}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Gender: <strong>{userProfile?.gender}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Preferred Workout Type: <strong>{userProfile?.preferredWorkoutType}</strong>
                        </Typography>
                    </Box>
                    <Box>
                        <p style={{margin:0}}>User Status</p>
                        <Typography variant="body2" color="text.secondary">
                            Training level <strong>{userProfile?.trainingLevel}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Physical level <strong>{userProfile?.physicalData}</strong>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "270px", margin: "10px auto" }}>
                    <Typography
                        variant="h6"
                        sx={{ marginTop: 1, color: "black", fontWeight: "700" }}
                    >
                    </Typography>
                </Box>
                <Box sx={{ width: "270px", margin: "10px auto" }}>
                    <Typography
                        variant="h6"
                        sx={{ marginTop: 1, color: "black", fontWeight: "700" }}
                    >
                    </Typography>
                </Box>
                <Box sx={{ width: "270px", margin: "10px auto" }}>
                    <Typography
                        variant="h6"
                        sx={{ marginTop: 1, color: "black", fontWeight: "700" }}
                    >
                        Subscribed to
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#ECECEC",
                            padding: "20px",
                            borderRadius: "10px",
                            marginTop: "10px",
                        }}
                    >
                        {userProfile?.subscribes?.length === 0 ? (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginTop: 1, fontSize: "12px", color: "black" }}
                            >
                                Not subscribed to any workouts.
                            </Typography>
                        ) : (
                            userProfile?.subscribes?.map((subscription, index) => (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ marginTop: 1, fontSize: "12px", color: "black" }}
                                >
                                    {subscription}
                                </Typography>
                            ))
                        )}
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "270px",
                        margin: "0 auto",
                        gap: "15px",
                        marginTop: "25px",
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{ color: "black", borderColor: "black", borderRadius: "7px" }}
                    >
                        Edit profile
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default OneClient;