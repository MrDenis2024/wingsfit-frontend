import { Box, Button, TextField, Rating } from "@mui/material";

const ReviewFormBlock = () => {
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
            />
            <Box sx={{display:"flex" ,alignItems: "center" , gap:"15px"}}>
                <Rating
                    name="rating"
                    size="large"
                    sx={{
                        alignSelf: "center",
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        alignSelf: "flex-end",
                    }}
                >
                    Отправить
                </Button>
            </Box>
        </Box>
    );
};

export default ReviewFormBlock;