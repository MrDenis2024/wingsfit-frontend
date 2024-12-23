import { UserInfoMutation } from "../../../types/userTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography, Paper, Divider } from "@mui/material";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectCourseTypes } from "../../CourseTypes/CourseTypesSlice.ts";
import { findCourseTypes } from "../../../constants.ts";

interface Props {
  requiredData: UserInfoMutation;
  optionalData: TrainerProfileMutation;
  clientData: ClientProfileMutation;
  role: "client" | "trainer";
}

const RegisterPreview: React.FC<Props> = ({
  requiredData,
  optionalData,
  clientData,
  role,
}) => {
  const courseTypes = useAppSelector(selectCourseTypes);
  const trainerCourses = findCourseTypes(
    courseTypes,
    ...optionalData.courseTypes,
  );
  const clientsPreferredWorkoutTypes = findCourseTypes(
    courseTypes,
    ...clientData.preferredWorkoutType,
  );

  return (
    <Grid
      container
      spacing={3}
      direction={"column"}
      sx={{
        my: 5,
        mx: 1,
        pb: 8,
        maxWidth: "600px",
        width: "100%",
        marginLeft: {
          xs: "unset",
          md: role === "trainer" ? "0" : "auto",
        },
        marginRight: {
          xs: "unset",
          md: role === "client" ? "0" : "auto",
        },
        color: "black",
      }}
    >
      <Paper
        sx={{
          padding: 3,
          backgroundColor: "rgba(51, 51, 51, 0.8)",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <Grid>
          <Typography
            align="center"
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
              "@media (max-width: 350px)": {
                fontSize: "16px",
              },
            }}
          >
            Обязательная информация:
          </Typography>
        </Grid>

        <Grid>
          {Object.keys(requiredData).map((key, index) => {
            const value = requiredData[key as keyof typeof requiredData];
            return (
              <Grid key={index + key} sx={{ mb: 1 }}>
                {typeof value === "string" && value !== "" && (
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {key}:
                    </span>{" "}
                    {value}
                  </Typography>
                )}
                {typeof value === "object" && key === "timeZone" && (
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {key}:
                    </span>{" "}
                    {requiredData.timeZone.label}
                  </Typography>
                )}
              </Grid>
            );
          })}
        </Grid>
        <Divider sx={{ backgroundColor: "white" }} />
        {role === "trainer" && (
          <>
            <Grid>
              <Typography
                align="center"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  "@media (max-width: 350px)": {
                    fontSize: "16px",
                  },
                }}
              >
                Дополнительная информация о тренере
              </Typography>
            </Grid>
            <Grid>
              {Object.keys(optionalData).map((key, index) => {
                const value = optionalData[key as keyof typeof optionalData];
                return (
                  <Grid key={index + key} sx={{ mb: 1 }}>
                    {typeof value === "string" && value !== "" && (
                      <Typography variant="body2">
                        <span
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {key} :{" "}
                        </span>
                        {value}
                      </Typography>
                    )}
                    {typeof value !== "string" &&
                      optionalData.courseTypes[0] !== "" && (
                        <Grid>
                          <Typography variant="body2">
                            <span
                              style={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                              }}
                            >
                              {key} :{" "}
                            </span>
                          </Typography>
                          {trainerCourses.map((type) => (
                            <Typography
                              variant="body2"
                              key={type._id}
                              sx={{ mx: 7 }}
                            >
                              -{type.name}
                            </Typography>
                          ))}
                        </Grid>
                      )}
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        {role === "client" && (
          <>
            <Grid>
              <Typography
                variant="h5"
                align="center"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  "@media (max-width: 350px)": {
                    fontSize: "16px",
                  },
                }}
              >
                Информация о клиенте:
              </Typography>
            </Grid>
            <Grid>
              {Object.keys(clientData).map((key, index) => {
                const value = clientData[key as keyof typeof clientData];
                return (
                  <Grid key={index + key} sx={{ mb: 1 }}>
                    {typeof value === "string" && (
                      <Typography variant="body2">
                        <span
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {key}:
                        </span>{" "}
                        {value}
                      </Typography>
                    )}
                    {typeof value !== "string" &&
                      clientData.preferredWorkoutType[0] !== "" && (
                        <Grid>
                          <Typography variant="body2">
                            <span
                              style={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                              }}
                            >
                              {key} :{" "}
                            </span>
                          </Typography>
                          {clientsPreferredWorkoutTypes.map((type) => (
                            <Typography
                              variant="body2"
                              key={type._id}
                              sx={{ mx: 7 }}
                            >
                              -{type.name}
                            </Typography>
                          ))}
                        </Grid>
                      )}
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default RegisterPreview;
