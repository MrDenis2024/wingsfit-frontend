import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectFetchReviewsLoading, selectReview } from "../trainersSlice.ts";
import { getTrainersReview } from "../trainersThunks.ts";
import Grid from "@mui/material/Grid2";
import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";

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
    const stars: React.ReactNode[] = [];

    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(<Star key={`star-${i}`} sx={{ color: "#47A76A" }} />);
        rating -= 1;
      } else if (rating >= 0.5) {
        stars.push(<StarHalf key={`star-${i}`} sx={{ color: "#47A76A" }} />);
        rating = 0;
      } else {
        stars.push(<StarOutline key={`star-${i}`} sx={{ color: "#47A76A" }} />);
      }
    }

    return <Grid sx={{ display: "flex", alignItems: "center" }}>{stars}</Grid>;
  };

  return (
    <Grid>
      {reviewsLoading && <LoadingIndicator />}
      {!reviewsLoading && reviews.length > 0 ? (
        <Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid display="flex" alignItems="center">
              <Typography sx={{ mr: 2 }}>Total rating:</Typography>
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
            {displayedReviews.map((review) => (
              <Grid
                key={review._id}
                sx={{
                  backgroundColor: "#ECECEC",
                  padding: "20px",
                  borderRadius: "10px",
                  marginTop: "10px",
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
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            {reviews.length > 5 && (
              <Button
                variant="contained"
                onClick={() => setShowAll(!showAll)}
                sx={{ marginTop: "10px" }}
              >
                {showAll ? "Скрыть" : "Показать все"}
              </Button>
            )}
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          У данного теренера ещё нет отзывов
        </Typography>
      )}
    </Grid>
  );
};

export default RatingAndReviews;
