import { Box, Button, TextField, Rating } from "@mui/material";
import React, {useEffect, useState} from "react";
import {selectError} from "../reviewSlice.ts";
import {useAppSelector} from "../../../app/hooks.ts";


interface ReviewFormProps {
    onSubmit: (reviewText: string, ratingValue: number | null) => void;
}

const ReviewFormBlock: React.FC<ReviewFormProps> = ({ onSubmit }) => {

    const [textReview, setTextReview] = useState<string>("");
    const [ratingReview, setRatingReview] = useState<number | null>(null);
    const error = useAppSelector(selectError);
    const reviewSubmit = () => {
        onSubmit(textReview, ratingReview);
        setTextReview("");
        setRatingReview(null)
    };

    useEffect(() => {
        console.log(error)
    }, [error]);

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
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </Box>
    );
};

export default ReviewFormBlock;