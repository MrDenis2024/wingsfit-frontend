import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import { ICourse } from "../../../types/courseTypes.ts";
import CourseCards from "../../courses/components/CourseCards.tsx";
import RatingAndReviews from "./RatingAndReviews.tsx";
import ReviewFormBlock from "../../reviewForm/components/ReviewFormBlock.tsx";
import { ITrainer } from "../../../types/trainerTypes.ts";

interface TrainerProfileDetailsProps {
  avatarImage: string;
  trainerProfile: ITrainer;
  courses: ICourse[];
  isOwner: boolean;
  id: string;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  handleReviewSubmit: (reviewText: string, ratingValue: number | null) => void;
}

const TrainerProfileDetails: React.FC<TrainerProfileDetailsProps> = ({
  avatarImage,
  trainerProfile,
  courses,
  isOwner,
  id,
  showForm,
  setShowForm,
  handleReviewSubmit,
}) => {
  return (
    <>
      <Box sx={{ backgroundColor: "#dedfe3", paddingY: "25px" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="center">
            <Grid
              sx={{ gridColumn: { xs: "span 12", sm: "span 4", md: "span 3" } }}
            >
              <CardMedia
                component="img"
                image={avatarImage}
                alt={`Фото тренера ${trainerProfile.user.firstName}`}
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto",
                }}
              />
            </Grid>
            <Grid
              sx={{ gridColumn: { xs: "span 12", sm: "span 8", md: "span 9" } }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {trainerProfile.user.firstName} {trainerProfile.user.lastName}
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
                  <span>{trainerProfile.user.phoneNumber || "N/A"}</span>
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
                    {trainerProfile.user.dateOfBirth.slice(0, 10) || "N/A"}
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
                  {trainerProfile.user.gender === "male" && <MaleIcon />}
                  {trainerProfile.user.gender === "female" && <FemaleIcon />}
                  {trainerProfile.user.gender === "other" && (
                    <TransgenderIcon />
                  )}
                  <strong>Gender:</strong>{" "}
                  <span>{trainerProfile.user.gender || "N/A"}</span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <FitnessCenterIcon />
                  <strong>Specialization:</strong>{" "}
                  {trainerProfile.specialization ||
                    "No specialization provided"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <AutoAwesomeIcon />
                  <strong>Experience:</strong>{" "}
                  {trainerProfile.experience || "Experience not provided"}
                </Typography>
                {!isOwner && (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: "fit-content" }}
                  >
                    Chat with Trainer
                  </Button>
                )}
                {isOwner && (
                  <Button
                    variant="outlined"
                    sx={{
                      width: "fit-content",
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
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#e3f3fc", paddingY: "20px" }}>
        <Container maxWidth="xl">
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", lineHeight: "1.6" }}
          >
            {trainerProfile.description || "No description available."}
          </Typography>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#ffffff", paddingY: "25px" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Available Courses
          </Typography>
          <CourseCards courses={courses} />

          <Box sx={{ marginTop: "40px" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Rating and Reviews
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "15px",
              }}
            >
              <RatingAndReviews id={id} />
            </Box>

            {!isOwner && (
              <>
                <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowForm(!showForm)}
                    sx={{
                      color: "black",
                      borderColor: "black",
                      borderRadius: "7px",
                    }}
                  >
                    {showForm ? "Close Review Form" : "Leave a Review"}
                  </Button>
                </Box>
                {showForm && (
                  <Box
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        marginBottom: "15px",
                        textAlign: "center",
                      }}
                    >
                      Leave a Review
                    </Typography>
                    <ReviewFormBlock onSubmit={handleReviewSubmit} />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TrainerProfileDetails;
