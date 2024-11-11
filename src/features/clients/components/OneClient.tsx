import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectClientProfile } from "../clientSlice.ts";
import { getClientProfile } from "../clientThunk.ts";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";

const OneClient = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectClientProfile);

  useEffect(() => {
    dispatch(getClientProfile(id));
  }, [dispatch]);

  return (
    <div>
      <Box
        sx={{
          maxWidth: "300px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={imageNotFound}
            alt="Фото тренера"
            sx={{
              width: 120,
              height: 120,
              margin: "15px auto",
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            {userProfile?.user.firstName} {userProfile?.user.lastName}
          </Typography>
        </Box>

        <Box
          sx={{
            marginBottom: "20px",
            backgroundColor: "#E1F5FE",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#0288D1", fontWeight: "600", marginBottom: "10px" }}
          >
            User Information
          </Typography>
          <Typography variant="body2" sx={{ color: "#01579B" }}>
            Phone number: <strong>{userProfile?.user.phoneNumber}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: "#01579B" }}>
            Date of Birth:{" "}
            <strong>{userProfile?.dateOfBirth.slice(0, 10)}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: "#01579B" }}>
            Gender: <strong>{userProfile?.gender}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: "#01579B" }}>
            Preferred Workout Type:{" "}
            <strong>{userProfile?.preferredWorkoutType}</strong>
          </Typography>
        </Box>

        <Box
          sx={{
            marginBottom: "20px",
            backgroundColor: "#F0F4C3",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: "#827717", fontWeight: "600", marginBottom: "10px" }}
          >
            User Status
          </Typography>
          <Typography variant="body2" sx={{ color: "#4E342E" }}>
            Training level: <strong>{userProfile?.trainingLevel}</strong>
          </Typography>
          <Typography variant="body2" sx={{ color: "#4E342E" }}>
            Physical level: <strong>{userProfile?.physicalData}</strong>
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Subscribed to
          </Typography>
          <Box
            sx={{
              backgroundColor: "#E0F7FA",
              padding: "15px",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          >
            {userProfile?.subscribes?.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", color: "#01579B" }}
              >
                Not subscribed to any workouts.
              </Typography>
            ) : (
              userProfile?.subscribes?.map((subscription, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ fontSize: "12px", color: "#01579B" }}
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
            alignItems: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#0288D1",
              borderColor: "#0288D1",
              borderRadius: "7px",
              "&:hover": {
                backgroundColor: "#E1F5FE",
                borderColor: "#0288D1",
              },
            }}
          >
            Edit profile
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default OneClient;
