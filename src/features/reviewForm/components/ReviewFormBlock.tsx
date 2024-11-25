import { Box, Button, TextField, Rating } from "@mui/material";
import React, {useState} from "react";


interface ReviewFormProps {
    onSubmit: (reviewText: string, ratingValue: number | null) => void;
}

const ReviewFormBlock: React.FC<ReviewFormProps> = ({ onSubmit }) => {

    const [textReview, setTextReview] = useState<string>("");
    const [ratingReview, setRatingReview] = useState<number | null>(null);

    const reviewSubmit = () => {
        onSubmit(textReview, ratingReview);
        setTextReview("");
        setRatingReview(null)
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
            <Box sx={{display:"flex" ,alignItems: "center" , gap:"15px"}}>
                <Rating
                    name="rating"
                    size="large"
                    sx={{
                        alignSelf: "center",
                    }}
                    value={ratingReview}
                    onChange={(_, newValue) => setRatingReview(newValue)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        alignSelf: "flex-end",
                    }}
                    onClick={reviewSubmit}
                >
                    Отправить
                </Button>
            </Box>
        </Box>
    );
};

export default ReviewFormBlock;