import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectCourses,
  selectOneCourse,
  selectOneCourseLoading,
} from "./coursesSlice.ts";
import { useEffect } from "react";
import { fetchCourses, getOneCourse } from "./coursesThunks.ts";
import {
  Alert,
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { apiURL } from "../../constants.ts";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import EditIcon from "@mui/icons-material/Edit";
import { selectUser } from "../users/userSlice.ts";
import { fetchCourseGroups } from "../groups/groupsThunk.ts";
import { selectFetchGroups, selectGroups } from "../groups/groupsSlice.ts";
import AnotherCoursesLinks from "./components/AnotherCoursesLinks.tsx";
import CoursesGroupCards from "./components/CoursesGroupCards.tsx";
import ChatButton from "../chat/components/ChatButton.tsx";

const OneCourse = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const course = useAppSelector(selectOneCourse);
  const isLoading = useAppSelector(selectOneCourseLoading);
  const trainerId = course?.user._id;
  const mediaQuery768 = useMediaQuery("(min-width:768px)");
  const user = useAppSelector(selectUser);
  const courses = useAppSelector(selectCourses);
  const groups = useAppSelector(selectGroups);
  const loadingGroups = useAppSelector(selectFetchGroups);

  useEffect(() => {
    if (id) {
      dispatch(getOneCourse(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (course) {
      dispatch(fetchCourseGroups(course._id));
      dispatch(fetchCourses(course.user._id));
    }
  }, [dispatch, course]);

  const handleClickEditCourse = () => {
    navigate(`/edit-course/${id}`);
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
  const courseImage = course.image ? apiURL + "/" + course.image : "";
  const avatar = course.user.avatar ? apiURL + "/" + course.user.avatar : "";
  const anotherCourses = courses.filter((item) => item._id !== course._id);
  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "#daf4fd",
          mt: mediaQuery768 ? 8 : 4,
          mb: mediaQuery768 ? 5 : 3,
          py: 4,
          borderBottom: "2px solid #bfbfbf",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          <Grid
            sx={{
              maxWidth: "660px",
              width: "100%",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: mediaQuery768 ? 700 : 500,
                color: "#000",
                fontSize: mediaQuery768 ? "30px" : "25px",
                whiteSpace: { xs: "normal", sm: "nowrap" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: "100%", sm: "calc(100% - 16px)" },
                textAlign: mediaQuery768 ? "left" : "center",
                mb: mediaQuery768 ? 2 : 0,
              }}
            >
              {course.title}
              {user?._id === course.user._id && (
                <Button
                  onClick={handleClickEditCourse}
                  variant="text"
                  sx={{
                    p: 0,
                    mb: 1,
                    width: "fit-content",
                    height: "38px",
                  }}
                >
                  <EditIcon sx={{ fontSize: "28px", color: "#000" }} />
                </Button>
              )}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#000",
                fontSize: mediaQuery768 ? "22px" : "16px",
                mb: 2,
                textAlign: mediaQuery768 ? "left" : "center",
              }}
            >
              Тренер:
              <Typography
                sx={{
                  display: "inline-block",
                  fontSize: "22px",
                  ml: 1,
                }}
              >
                {course.user.firstName} {course.user.lastName}
              </Typography>
            </Typography>
            <Grid
              sx={{
                width: "200px",
                height: "240px",
                mb: 2,
                mx: "auto",
                display: mediaQuery768 ? "none" : "flex",
                backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              {course.user.avatar ? (
                <CardMedia
                  component="img"
                  image={avatar}
                  alt={course.user.firstName}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <NoPhotographyIcon sx={{ fontSize: "100px" }} />
              )}
            </Grid>
            <Grid
              sx={{
                display: "flex",
                gap: 1,
                width: "100%",
                justifyContent: mediaQuery768
                  ? "space-between"
                  : "space-around",
                flexWrap: "wrap-reverse",
              }}
            >
              <Grid>
                <Grid
                  sx={{
                    display: "flex",
                    mb: 2,
                  }}
                >
                  <GroupAddIcon
                    sx={{ color: "#000", fontSize: "30px", mt: 1 }}
                  />
                  <Grid sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "22px",
                      }}
                    >
                      Формат: {course.format}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    mb: 2,
                  }}
                >
                  <LocalOfferIcon sx={{ color: "#000", fontSize: "30px" }} />
                  <Grid sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "22px",
                      }}
                    >
                      {course.price}KGZ
                    </Typography>
                  </Grid>
                </Grid>
                {user?._id !== trainerId && trainerId && user?._id &&  (
                  <ChatButton
                    firstPersonId={trainerId}
                    secondPersonId={user._id}
                    buttonText="Попробовать!"
                  >
                    {{
                      backgroundColor: "#5cc532",
                      color: "#ffffff",
                      fontSize: "20px",
                      textTransform: "none",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#408a23",
                      },
                    }}
                  </ChatButton>
                )}
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  mb: 2,
                }}
              >
                <CalendarMonthIcon
                  sx={{ color: "#000", fontSize: "30px", mt: 1 }}
                />
                <Grid sx={{ ml: 2, maxWidth: "170px" }}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "22px",
                    }}
                  >
                    График
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#555555" }}>
                    {course.schedule.join(", ")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              maxWidth: "371px",
              width: "100%",
              position: "relative",
              display: mediaQuery768 ? "block" : "none",
            }}
          >
            <Grid
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translate(0, -50%)",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "448px",
                backgroundColor: "#ccc",
              }}
            >
              {course.user.avatar ? (
                <CardMedia
                  component="img"
                  image={avatar}
                  alt={course.user.firstName}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                />
              ) : (
                <NoPhotographyIcon sx={{ fontSize: "190px" }} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Container maxWidth={"lg"}>
        <Grid>
          <Typography
            variant="h3"
            sx={{
              fontSize: mediaQuery768 ? "30px" : "22px",
              textAlign: mediaQuery768 ? "left" : "center",
              mb: 2,
            }}
          >
            Группы
          </Typography>
          <Grid
            sx={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: mediaQuery768 ? "start" : "center",
            }}
          >
            {!loadingGroups ? (
              groups.length > 0 ? (
                groups.map((group) => (
                  <CoursesGroupCards key={group._id} group={group} />
                ))
              ) : (
                <Alert severity="info" sx={{ width: "100%" }}>
                  Здесь пока нет никаких групп!
                </Alert>
              )
            ) : (
              <LoadingIndicator />
            )}
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            mt: 4,
            gap: "30px",
            flexWrap: mediaQuery768 ? "nowrap" : "wrap-reverse",
            justifyContent: mediaQuery768 ? "space-between" : "center",
          }}
        >
          {course.image ? (
            <Grid size={{ md: 6, sm: 7, xs: 12 }} sx={{ maxWidth: "654px" }}>
              <CardMedia
                component="img"
                image={courseImage}
                alt={course.image}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
              />
            </Grid>
          ) : null}
          <Grid
            size={{ md: 6, sm: 5, xs: 12 }}
            sx={{
              maxWidth: "450px",
              minWidth: mediaQuery768 ? "300px" : "none",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: mediaQuery768 ? "30px" : "22px",
                mb: 2,
                textAlign: mediaQuery768 ? "left" : "center",
              }}
            >
              О программе
            </Typography>
            <Typography sx={{ color: "#747784" }}>
              {course.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            my: mediaQuery768 ? 10 : 4,
            gap: "30px",
            flexWrap: mediaQuery768 ? "nowrap" : "wrap",
            justifyContent: mediaQuery768 ? "space-between" : "center",
          }}
        >
          <Grid
            size={{ md: 5, sm: 7, xs: 12 }}
            sx={{
              maxWidth: "450px",
              minWidth: mediaQuery768 ? "300px" : "none",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: mediaQuery768 ? "30px" : "22px",
                mb: 2,
                textAlign: mediaQuery768 ? "left" : "center",
              }}
            >
              О тренере
            </Typography>
            <Typography sx={{ color: "#747784" }}>
              {course.user.description}
            </Typography>
          </Grid>
          {course.user.avatar ? (
            <Grid size={{ md: 7, sm: 5, xs: 12 }} sx={{ maxWidth: "654px" }}>
              <CardMedia
                component="img"
                image={avatar}
                alt={course.user.firstName}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "30px",
                }}
              />
            </Grid>
          ) : null}
        </Grid>
        {anotherCourses.length > 0 && (
          <Grid container>
            <Grid size={12} sx={{ my: 3 }}>
              <Typography variant="h3" sx={{ fontSize: "20px", mb: 2 }}>
                Другие программы тренера
              </Typography>
            </Grid>
            <Grid
              size={{ md: 6, xs: 12 }}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <AnotherCoursesLinks courses={anotherCourses} />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default OneCourse;
