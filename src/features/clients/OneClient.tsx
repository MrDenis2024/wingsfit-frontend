import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectClientProfile } from "./clientSlice.ts";
import { getClientProfile } from "./clientThunk.ts";
import {
  Box,
  Button,
  CardMedia,
  Collapse,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import CelebrationIcon from "@mui/icons-material/Celebration";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import SchoolIcon from "@mui/icons-material/School";
import HealingIcon from "@mui/icons-material/Healing";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { apiURL, findCourseTypes } from "../../constants.ts";
import { selectCourseTypes } from "../CourseTypes/CourseTypesSlice.ts";
import { CourseTypeFields } from "../../types/courseTypes.ts";

const OneClient = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const oneClient = useAppSelector(selectClientProfile);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const courseTypes = useAppSelector(selectCourseTypes);
  let avatarImage = imageNotFound;
  let preferredWorkoutType: CourseTypeFields[] = [];

  if (oneClient) {
    preferredWorkoutType = findCourseTypes(
      courseTypes,
      ...oneClient.preferredWorkoutType,
    );
  }

  useEffect(() => {
    dispatch(getClientProfile(id));
  }, [dispatch, id]);

  const toggleStatus = () => setIsStatusOpen((prev) => !prev);

  if (oneClient && oneClient.user.avatar) {
    avatarImage = `${apiURL}/${oneClient.user.avatar}`;
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#dedfe3",
          paddingY: "25px",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "start",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <CardMedia
            component="img"
            image={avatarImage}
            alt="Фото клиента"
            sx={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              padding: "15px",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                {oneClient?.user.firstName} {oneClient?.user.lastName}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", marginBottom: "10px" }}
              >
                User Information:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                <LocalPhoneIcon />
                <strong>Phone number:</strong>{" "}
                <span>{oneClient?.user.phoneNumber}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                <CelebrationIcon />
                <strong>Date of Birth: </strong>
                <span>
                  {oneClient?.user.dateOfBirth?.slice(0, 10) || "N/A"}
                </span>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                {oneClient?.user.gender === "male" && <MaleIcon />}
                {oneClient?.user.gender === "female" && <FemaleIcon />}
                {oneClient?.user.gender === "other" && <TransgenderIcon />}
                <strong>Gender:</strong>{" "}
                <span>{oneClient?.user.gender || "N/A"}</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                <SportsGymnasticsIcon />
                <strong>Preferred Workout Type: </strong>
                {preferredWorkoutType.map((type) => (
                  <span key={type._id}>{type.name}</span>
                ))}
              </Typography>
            </Box>

            <Box
              sx={{
                marginBottom: "20px",
                backgroundColor: "#dff3fc",
                padding: "5px",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={toggleStatus}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", marginBottom: "10px" }}
                >
                  User Status
                </Typography>
                <IconButton>
                  {isStatusOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={isStatusOpen}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "16px",
                    marginBottom: "5px",
                  }}
                >
                  <SchoolIcon /> <strong>Training level:</strong>{" "}
                  {oneClient?.trainingLevel}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "16px",
                    marginBottom: "5px",
                  }}
                >
                  <HealingIcon /> <strong>Physical data:</strong>{" "}
                  {oneClient?.physicalData}
                </Typography>
              </Collapse>
            </Box>

            <Box sx={{ textAlign: "start", marginBottom: "20px" }}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Subscribed to
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#dff3fc",
                  padding: "15px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                {oneClient?.subscribes?.length === 0 ? (
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "12px", color: "#01579B" }}
                  >
                    Not subscribed to any workouts.
                  </Typography>
                ) : (
                  oneClient?.subscribes?.map((subscription, index) => (
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
                alignItems: "end",
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
                    backgroundColor: "#dff3fc",
                    borderColor: "#0288D1",
                  },
                }}
              >
                Edit profile
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OneClient;
