import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectOneCourse, selectOneCourseLoading } from "./coursesSlice.ts";
import { useEffect } from "react";
import { getOneCourse } from "./coursesThunks.ts";
import { Box, Button, Card, CardMedia, Stack, Typography } from "@mui/material";
import { apiURL } from "../../constants.ts";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";

const OneCourse = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const course = useAppSelector(selectOneCourse);
  const isLoading = useAppSelector(selectOneCourseLoading);
  const trainerId = course?.user._id;

  useEffect(() => {
    if (id) {
      dispatch(getOneCourse(id));
    }
  }, [dispatch, id]);

  const handleClick = () => {
    navigate(`/trainers/${trainerId}`);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingIndicator />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="#0cc5d6">
          Курс не найден.
        </Typography>
      </Box>
    );
  }

  const cardImage = course.image ? apiURL + "/" + course.image : "";

  return (
    <Stack sx={{ mt: 4, mb: 5 }} alignItems="center">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", sm: 380, md: 450 },
          backgroundColor: "#ffffff",
          border: "1px solid #ddeeff",
          borderRadius: "6px",
          boxShadow: 4,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            component="div"
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#333333",
              fontSize: { xs: "16px", sm: "20px" },
              whiteSpace: { xs: "normal", sm: "nowrap" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: { xs: "100%", sm: "calc(100% - 16px)" },
              textAlign: "left",
            }}
          >
            {course.title} with {course.user.firstName} {course.user.lastName}
          </Typography>
        </Box>

        {course.image && (
          <CardMedia
            component="img"
            image={cardImage}
            alt={course.title}
            sx={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              mb: 2,
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {course.description}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#555555" }}>
            {course.schedule}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#555555" }}>
            Продолжительность: {course.scheduleLength}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#555555" }}>
            Цена: ${course.price}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#555555" }}>
            Ограничение: {course.maxClients} человек
          </Typography>
        </Box>

        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            backgroundColor: "#0cc5d6",
            color: "#ffffff",
            mt: 2,
            textTransform: "none",
            ":hover": {
              backgroundColor: "#00acc1",
            },
          }}
        >
          Попробовать!
        </Button>
      </Card>
    </Stack>
  );
};

export default OneCourse;
