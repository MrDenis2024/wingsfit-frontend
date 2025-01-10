import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton, Tooltip,
  Typography,
} from "@mui/material";
import { ICourse } from "../../../types/courseTypes.ts";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { apiURL } from "../../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";
import Grid from "@mui/material/Grid2";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ClearIcon from "@mui/icons-material/Clear";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import { toast } from "react-toastify";
import {deleteCourse, fetchCourses} from "../coursesThunks.ts";
import { selectDeleteCourseLoading } from "../coursesSlice.ts";

interface Props {
  course: ICourse;
  isShort?: boolean;
}

const CourseCard: React.FC<Props> = ({ course, isShort }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const courseDeleteLoading = useAppSelector(selectDeleteCourseLoading);
  const [confirmOpen, setConfirmOpen] = useState(false);
  let cardImage = imageNotFound;

  if (course.image) {
    cardImage = `${apiURL}/${course.image}`;
  }

  const handleCourseDelete = async (courseId: string) => {
    try {
      await dispatch(deleteCourse(courseId)).unwrap();
      await dispatch(fetchCourses(user?._id));
      navigate("/");
      toast.success("Курс успешно удалён");
    } catch {
      toast.error("Произошла ошибка при удалении курса");
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, height: "100%", border: "1px solid silver" }}>
        <CardHeader
          title={
            <Grid container alignItems="center" justifyContent="space-between">
              <Tooltip title={course.title} placement="top" >
                <Typography
                    component={NavLink}
                    to={`/courses/${course._id}`}
                    variant="h6"
                    sx={{
                      color: "#1a3b7e",
                      textDecoration: "none",
                      flex: "1",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                >
                  {course.title}
                </Typography>
              </Tooltip>
              <Grid container>
                {course.user._id === user?._id && (
                  <Link
                    to={`/edit-course/${course._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <IconButton
                      sx={{
                        color: "#0288D1",
                        borderColor: "#0288D1",
                        "&:hover": {
                          backgroundColor: "#dff3fc",
                          borderColor: "#0288D1",
                        },
                        ml: 1,
                      }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </Link>
                )}
                {(course.user._id === user?._id ||
                  user?.role === "admin" ||
                  user?.role === "superAdmin") && (
                  <IconButton
                    sx={{
                      color: "red",
                      borderColor: "#0288D1",
                      "&:hover": {
                        backgroundColor: "#dff3fc",
                        borderColor: "#0288D1",
                      },
                      ml: 1,
                    }}
                    onClick={() => setConfirmOpen(true)}
                    disabled={
                      courseDeleteLoading
                        ? courseDeleteLoading === course._id
                        : false
                    }
                  >
                    {courseDeleteLoading === course._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <ClearIcon />
                    )}
                  </IconButton>
                )}
              </Grid>
            </Grid>
          }
          sx={{
            p: 1,
            color: "#1a3b7e",
            textDecoration: "none",
          }}
        />
        <CardActionArea
          component={NavLink}
          to={`/courses/${course._id}`}
          sx={{ height: "100%" }}
        >
          <CardMedia
            component="img"
            height="220"
            image={cardImage}
            alt="Course Image"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="textSecondary"
              textAlign="center"
            >
              {course.schedule.join(", ")}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Тренер: {course.user.firstName} {course.user.lastName}
            </Typography>
            <Typography variant="body2" sx={{
              maxHeight: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}>
              О курсе - {course.description}
            </Typography>
            {!isShort && (
              <>
                <Typography variant="body2" color="textSecondary">
                  Тип занятий:{" "}
                  {course.courseType.name.charAt(0).toUpperCase() +
                    course.courseType.name.slice(1)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Цена: {course.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Формат:{" "}
                  {course.format === "single" ? "индивидуальные" : "групповые"}{" "}
                  тренировки
                </Typography>
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <CustomConfirmDialog
        open={confirmOpen}
        title="Удалить курс"
        description="Вы уверены, что хотите удалить данный курс? Удалятся так же группы в данном курсе и все занятия."
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={() => handleCourseDelete(course._id)}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default CourseCard;
