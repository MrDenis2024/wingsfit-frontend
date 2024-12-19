import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectOneCourse, selectOneCourseLoading } from "./coursesSlice.ts";
import { useEffect } from "react";
import { getOneCourse } from "./coursesThunks.ts";
import {Box, Button, Card, CardMedia, Container, Stack, Typography} from "@mui/material";
import { apiURL } from "../../constants.ts";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import EditIcon from '@mui/icons-material/Edit';

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

    const handleClickEditCourse = () => {
        navigate(`/editCourses/${id}`);
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
  const avatart = course.user.avatar ? apiURL + "/" + course.user.avatar : "";

  return (
    <Stack sx={{backgroundColor: "#daf4fd", mt: 8, mb: 5, pt: 6, pb: 3, borderBottom: "2px solid #bfbfbf"}} alignItems="center">
      <Container maxWidth="lg" sx={{position: "relative"}}>
        <Grid sx={{
            maxWidth: "660px",
            width: "100%",
            position: "relative"
        }}>
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
          <Grid sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "space-between",
            flexWrap: "wrap-reverse",
          }}>
            <Grid>
              <Grid sx={{
                display: "flex",
                  mb: 2,
              }}>
                <GroupAddIcon sx={{ color: "#000", fontSize: "30px" , mt: 1}}/>
                <Grid sx={{ml: 2}}>
                  <Typography sx={{
                    color: "#000",
                    fontSize: "22px",
                  }}>
                    Формат: {course.format}
                  </Typography>
                  <Typography sx={{
                    color: "#000",
                    fontSize: "22px",
                  }}>
                    Количество клиентов - {course.maxClients}
                  </Typography>
                </Grid>
              </Grid>
              <Grid sx={{
                display: "flex",
                  mb: 2,
              }}>
                <LocalOfferIcon sx={{ color: "#000", fontSize: "30px" }}/>
                <Grid sx={{ml: 2}}>
                  <Typography sx={{
                    color: "#000",
                    fontSize: "22px",
                  }}>
                    {course.price}KGZ - {course.scheduleLength} занятий
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
                        borderRadius: '10px',
                      ":hover": {
                        backgroundColor: "#408a23",
                      },
                    }}
                  >
                    Попробовать!
                  </Button>
            </Grid>
                  <Grid sx={{
                      display: "flex",
                      mb: 2,
                  }}>
                      <CalendarMonthIcon sx={{ color: "#000", fontSize: "30px" , mt: 1}}/>
                      <Grid sx={{ml: 2}}>
                          <Typography sx={{
                              color: "#000",
                              fontSize: "22px",
                          }}>
                              График
                          </Typography>
                          <Typography sx={{
                              color: "#000",
                              fontSize: "22px",
                          }}>
                              {course.schedule}
                          </Typography>
                      </Grid>
                  </Grid>
          </Grid>
        </Grid>
          <Grid sx={{position: "absolute" , top: "-94px", right: 0, borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "371px", height: "448px", backgroundColor: "#ccc"}}>
              {course.user.avatar?
                          <CardMedia
                            component="img"
                            image={avatart}
                            alt={course.user.firstName}
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "20px",
                            }}
                          />
                   :
                  <NoPhotographyIcon sx={{fontSize: '190px',}}/>}
          </Grid>
      </Container>
      {/*<Card*/}
      {/*  sx={{*/}
      {/*    display: "flex",*/}
      {/*    flexDirection: "column",*/}
      {/*    width: { xs: "100%", sm: 380, md: 450 },*/}
      {/*    backgroundColor: "#ffffff",*/}
      {/*    border: "1px solid #ddeeff",*/}
      {/*    borderRadius: "6px",*/}
      {/*    boxShadow: 4,*/}
      {/*    p: 2,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      display: "flex",*/}
      {/*      flexDirection: "column",*/}
      {/*      alignItems: "flex-start",*/}
      {/*      mb: 2,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Typography*/}
      {/*      component="div"*/}
      {/*      variant="h6"*/}
      {/*      sx={{*/}
      {/*        fontWeight: 700,*/}
      {/*        color: "#333333",*/}
      {/*        fontSize: { xs: "16px", sm: "20px" },*/}
      {/*        whiteSpace: { xs: "normal", sm: "nowrap" },*/}
      {/*        overflow: "hidden",*/}
      {/*        textOverflow: "ellipsis",*/}
      {/*        maxWidth: { xs: "100%", sm: "calc(100% - 16px)" },*/}
      {/*        textAlign: "left",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {course.title} with {course.user.firstName} {course.user.lastName}*/}
      {/*    </Typography>*/}
      {/*  </Box>*/}

      {/*  {course.image && (*/}
      {/*    <CardMedia*/}
      {/*      component="img"*/}
      {/*      image={cardImage}*/}
      {/*      alt={course.title}*/}
      {/*      sx={{*/}
      {/*        width: "100%",*/}
      {/*        height: "150px",*/}
      {/*        objectFit: "cover",*/}
      {/*        borderRadius: "8px",*/}
      {/*        mb: 2,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}

      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      display: "flex",*/}
      {/*      flexDirection: "column",*/}
      {/*      gap: 1,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>*/}
      {/*      {course.description}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="subtitle2" sx={{ color: "#555555" }}>*/}
      {/*      {course.schedule}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="subtitle2" sx={{ color: "#555555" }}>*/}
      {/*      Продолжительность: {course.scheduleLength}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="subtitle2" sx={{ color: "#555555" }}>*/}
      {/*      Цена: ${course.price}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="subtitle2" sx={{ color: "#555555" }}>*/}
      {/*      Ограничение: {course.maxClients} человек*/}
      {/*    </Typography>*/}
      {/*  </Box>*/}

      {/*  <Button*/}
      {/*    onClick={handleClick}*/}
      {/*    variant="contained"*/}
      {/*    sx={{*/}
      {/*      backgroundColor: "#0cc5d6",*/}
      {/*      color: "#ffffff",*/}
      {/*      mt: 2,*/}
      {/*      textTransform: "none",*/}
      {/*      ":hover": {*/}
      {/*        backgroundColor: "#00acc1",*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Попробовать!*/}
      {/*  </Button>*/}
      {/*</Card>*/}
    </Stack>
  );
};

export default OneCourse;
