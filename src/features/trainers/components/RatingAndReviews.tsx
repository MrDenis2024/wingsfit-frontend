import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectFetchReviewsLoading, selectReview } from "../trainersSlice.ts";
import { getTrainersReview } from "../trainersThunks.ts";
import Grid from "@mui/material/Grid2";
import { Star, StarHalf, StarOutline } from "@mui/icons-material";

interface Props {
  id: string;
}

const RatingAndReviews: React.FC<Props> = ({ id }) => {
  const reviews = useAppSelector(selectReview);
  const reviewsLoading = useAppSelector(selectFetchReviewsLoading);
  const dispatch = useAppDispatch();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getTrainersReview(id));
  }, [dispatch, id]);

  const total = reviews.reduce((acc, review) => {
    acc += review.rating / reviews.length;
    return Math.round(acc * 2) / 2;
  }, 0);

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 5);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <Grid sx={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star key={`full-${index}`} sx={{ color: "#A8E4A0" }} />
        ))}
        {hasHalfStar && <StarHalf sx={{ color: "#A8E4A0" }} />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <StarOutline key={`empty-${index}`} sx={{ color: "#A8E4A0" }} />
        ))}
      </Grid>
    );
  };

  return (
    <Grid
      sx={{
        backgroundColor: "#ECECEC",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid display="flex" alignItems="center">
          {renderStars(total)}
        </Grid>
        <Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "12px", color: "black", display: "flex" }}
          >
            Based on {reviews.length} reviews
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        {reviews.map((review) => (
          <Grid
            key={review._id}
            sx={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <Grid>
              <Typography variant="body2">
                "{review.comment}" - {review.clientId.firstName}
              </Typography>
            </Grid>
            <Grid>{renderStars(review.rating)}</Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default RatingAndReviews;
