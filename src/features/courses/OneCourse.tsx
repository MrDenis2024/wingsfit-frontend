import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectCourses,
  selectCoursesFetching,
  selectOneCourse,
  selectOneCourseLoading,
} from "./coursesSlice.ts";
import { useEffect } from "react";
import { fetchCourses, getOneCourse } from "./coursesThunks.ts";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Link,
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

const OneCourse = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const course = useAppSelector(selectOneCourse);
  const isLoading = useAppSelector(selectOneCourseLoading);
  const trainerId = course?.user._id;
  const mediaQuery768 = useMediaQuery("(min-width:768px)");
  const user = useAppSelector(selectUser);
  const loadingCourses = useAppSelector(selectCoursesFetching);
  const courses = useAppSelector(selectCourses);
  const groups = useAppSelector(selectGroups);
  const loadingGroups = useAppSelector(selectFetchGroups);

  useEffect(() => {
    if (id) {
      dispatch(getOneCourse(id));
      dispatch(fetchCourses(user?._id));
      dispatch(fetchCourseGroups(id));
    }
  }, [dispatch, id]);

  const handleClick = () => {
    navigate(`/trainers/${trainerId}`);
  };

  const handleClickEditCourse = () => {
    navigate(`/edit-course/${id}`);
  };

  const handleClickGroup = (idGroup: string) => {
    navigate(`/groups/${idGroup}`);
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

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "#daf4fd",
          mt: 8,
          mb: 5,
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
                fontWeight: 700,
                color: "#000",
                fontSize: "32px",
                whiteSpace: { xs: "normal", sm: "nowrap" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: { xs: "100%", sm: "calc(100% - 16px)" },
                textAlign: "left",
                mb: 2,
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
                fontSize: "22px",
                mb: 2,
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
                width: "140px",
                height: "168px",
                mb: 2,
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
                gap: 2,
                width: "100%",
                justifyContent: "space-between",
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
                <Button
                  onClick={handleClick}
                  variant="contained"
                  sx={{
                    backgroundColor: "#5cc532",
                    color: "#ffffff",
                    mt: 2,
                    fontSize: "20px",
                    textTransform: "none",
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor: "#408a23",
                    },
                  }}
                >
                  Попробовать!
                </Button>
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
                <Grid sx={{ ml: 2 }}>
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
      <Container sx={{ mt: 10 }} maxWidth={"lg"}>
        <Grid>
          <Typography variant="h3" sx={{ fontSize: "30px", mb: 2 }}>
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
                  <Card
                    sx={{
                      width: "300px",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        Уровень: {group.trainingLevel}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {group.title}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        Начало: {group.startTime}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        Время: {group.scheduleLength}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                        Кол-во человек: {group.maxClients}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleClickGroup(group._id)}
                      >
                        Вступить в группу
                      </Button>
                    </CardActions>
                  </Card>
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
            mt: 7,
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
            <Typography variant="h3" sx={{ fontSize: "30px", mb: 2 }}>
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
            my: 10,
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
            <Typography variant="h3" sx={{ fontSize: "30px", mb: 2 }}>
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
        <Grid sx={{ my: 6 }}>
          <Typography variant="h3" sx={{ fontSize: "20px", mb: 2 }}>
            Другие программы тренера
          </Typography>
          <Grid
            sx={{
              maxWidth: "500px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {!loadingCourses ? (
              courses.length > 1 ? (
                courses.map((course) => {
                  if (course._id !== id) {
                    return (
                      <Link
                        sx={{
                          display: "flex",
                          textDecoration: "none",
                          width: "100px",
                          height: "100px",
                          backgroundImage: `url(${apiURL}/${course.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "auto",
                          borderRadius: "5px",
                          color: "#fff",
                          justifyContent: "center",
                          alignItems: "end",
                        }}
                        href={`/courses/${course._id}`}
                      >
                        <Typography
                          component="span"
                          sx={{ textAlign: "center" }}
                        >
                          {course.title}
                        </Typography>
                      </Link>
                    );
                  }
                })
              ) : (
                <Alert severity="info" sx={{ width: "100%" }}>
                  Здесь пока нет никаких курсов!
                </Alert>
              )
            ) : (
              <LoadingIndicator />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OneCourse;
