import { Box, Rating, TextField } from "@mui/material";
import React, { useState } from "react";
import { selectLoading } from "../reviewSlice.ts";
import { useAppSelector } from "../../../app/hooks.ts";
import LoadingButton from "@mui/lab/LoadingButton";

interface ReviewFormProps {
  onSubmit: (reviewText: string, ratingValue: number | null) => void;
}

const ReviewFormBlock: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [textReview, setTextReview] = useState<string>("");
  const [ratingReview, setRatingReview] = useState<number | null>(null);
  const loading = useAppSelector(selectLoading);
  const reviewSubmit = () => {
    onSubmit(textReview, ratingReview);
    setTextReview("");
    setRatingReview(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 3,
      }}
    >
      <TextField
        label="Your Review"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={textReview}
        onChange={(e) => setTextReview(e.target.value)}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Rating
          name="rating"
          size="large"
          sx={{
            alignSelf: "center",
          }}
          value={ratingReview}
          onChange={(_, newValue) => setRatingReview(newValue)}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          loading={loading}
          onClick={reviewSubmit}
          sx={{
            alignSelf: "flex-end",
            mt: 3,
            mb: 2,
          }}
        >
          Отправить
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ReviewFormBlock;
