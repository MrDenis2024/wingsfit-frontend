import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import RatingAndReviews from "./components/RatingAndReviews.tsx";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect, useState } from "react";
import { selectTrainerProfile } from "./trainersSlice.ts";
import { getTrainerProfile } from "./trainersThunks.ts";
import ReviewFormBlock from "../reviewForm/components/ReviewFormBlock.tsx";
import { createReview } from "../reviewForm/reviewThunk.ts";
import { toast } from "react-toastify";
import { selectError } from "../reviewForm/reviewSlice.ts";

const OneTrainer = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const trainerProfile = useAppSelector(selectTrainerProfile);
  const [showForm, setShowForm] = useState(false);
  const reviewError = useAppSelector(selectError);

  const handleReviewSubmit = async (
    reviewText: string,
    ratingValue: number | null,
  ) => {
    try {
      if (reviewText && ratingValue !== null) {
        await dispatch(
          createReview({
            comment: reviewText,
            rating: ratingValue,
            trainerId: id,
          }),
        ).unwrap();
        toast.success("Отзыв успешно отправлен!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    dispatch(getTrainerProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
    }
  }, [reviewError]);

  return (
    <Box>
      <Box>
        <CardMedia
          component="img"
          image={trainerProfile?.user.avatar || imageNotFound}
          alt={`Фото тренера ${trainerProfile?.user.firstName || ""}`}
          sx={{
            width: 120,
            height: 120,
            margin: "15px auto",
          }}
        />
      </Box>

      <Box sx={{ width: "270px", margin: "0px auto" }}>
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ marginTop: 1, color: "black", fontWeight: "700" }}
        >
          {trainerProfile?.user.firstName} {trainerProfile?.user.lastName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1, fontSize: "12px", color: "black" }}
        >
          {trainerProfile?.specialization || "No specialization provided"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1, fontSize: "12px", color: "black" }}
        >
          {trainerProfile?.experience
            ? `${trainerProfile.experience} of experience`
            : "Experience not provided"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1, fontSize: "12px", color: "black" }}
        >
          {/*{trainerProfile?.certificates || "No certificates available"}*/}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginTop: 1,
            fontSize: "12px",
            color: "black",
            lineHeight: "normal",
          }}
        >
          {trainerProfile?.description ||
            "Passionate about helping individuals achieve their fitness goals through personalized training programs."}
        </Typography>
      </Box>
      <Box sx={{ width: "270px", margin: "10px auto" }}>
        <Typography
          variant="h6"
          sx={{ marginTop: 1, color: "black", fontWeight: "700" }}
        >
          Calendar Schedule
        </Typography>
        <Box
          sx={{
            backgroundColor: "#ECECEC",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "12px", color: "black" }}
          >
            {trainerProfile?.availableDays || "No schedule available"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "270px", margin: "10px auto" }}>
        <Typography
          variant="h6"
          sx={{ marginTop: 1, color: "black", fontWeight: "700" }}
        >
          Rating and Reviews
        </Typography>
        <Box>
          <RatingAndReviews id={id} />
        </Box>
      </Box>
      <Box
        sx={{
          display: showForm ? "block" : "none",
          width: "270px",
          margin: "10px auto",
        }}
      >
        <ReviewFormBlock onSubmit={handleReviewSubmit} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "270px",
          margin: "0 auto",
          gap: "15px",
          marginTop: "25px",
          marginBottom: "25px",
        }}
      >
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "black", borderRadius: "7px" }}
        >
          Chat with Trainer
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "black", borderRadius: "7px" }}
        >
          Book trial class
        </Button>
        <Button
          onClick={() => setShowForm((prev) => !prev)}
          variant="outlined"
          sx={{ color: "black", borderColor: "black", borderRadius: "7px" }}
        >
          {showForm ? "Close review form" : "Leave review"}
        </Button>
      </Box>
    </Box>
  );
};

export default OneTrainer;
