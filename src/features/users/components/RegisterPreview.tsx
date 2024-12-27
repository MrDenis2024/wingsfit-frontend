import { UserInfoMutation } from "../../../types/userTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Typography,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
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
  const hasTrainerData =
    optionalData.description ||
    optionalData.specialization ||
    optionalData.experience ||
    optionalData.courseTypes.length > 0 ||
    optionalData.availableDays.length > 0;

  const hasClientData =
    clientData.preferredWorkoutType.length > 0 ||
    clientData.trainingLevel ||
    clientData.physicalData;

  return (
    <Grid
      container
      spacing={3}
      direction={"column"}
      sx={{
        my: 5,
        mx: 1,
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
          <Grid sx={{ mb: 1 }}>
            <Typography variant="body2">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Имя:
              </span>{" "}
              {requiredData.firstName}
            </Typography>
          </Grid>
          <Grid sx={{ mb: 1 }}>
            <Typography variant="body2">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Фамилия:
              </span>{" "}
              {requiredData.lastName}
            </Typography>
          </Grid>
          <Grid sx={{ mb: 1 }}>
            <Typography variant="body2">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                TimeZone:
              </span>{" "}
              {requiredData.timeZone.label}
            </Typography>
          </Grid>
          <Grid sx={{ mb: 1 }}>
            <Typography variant="body2">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Телефонный номер:
              </span>{" "}
              {requiredData.phoneNumber}
            </Typography>
          </Grid>
          <Grid sx={{ mb: 1 }}>
            <Typography variant="body2">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Дата рождения:
              </span>{" "}
              {requiredData.dateOfBirth}
            </Typography>
          </Grid>
          <Grid sx={{ mb: 1 }}>
            <Typography variant="body2">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Пол:
              </span>{" "}
              {requiredData.gender === "male" && "мужской"}
              {requiredData.gender === "female" && "женский"}
              {requiredData.gender === "other" && "другой"}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: "white" }} />

        {role === "trainer" && hasTrainerData && (
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
              {optionalData.description && (
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Описание:
                    </span>{" "}
                    {optionalData.description}
                  </Typography>
                </Grid>
              )}
              {optionalData.specialization && (
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Специализация:
                    </span>{" "}
                    {optionalData.specialization}
                  </Typography>
                </Grid>
              )}
              {optionalData.experience && (
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Опыт:
                    </span>{" "}
                    {optionalData.experience}
                  </Typography>
                </Grid>
              )}
              {optionalData.courseTypes.length > 0 && (
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Типы курсов:
                    </span>
                  </Typography>
                  {trainerCourses.map((type) => (
                    <Typography variant="body2" key={type._id} sx={{ mx: 7 }}>
                      -{type.name}
                    </Typography>
                  ))}
                </Grid>
              )}
              {optionalData.availableDays.length > 0 && (
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Дни занятий:</strong>
                  </Typography>
                  <Grid container spacing={1}>
                    {optionalData.availableDays.map((day) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={true}
                            disabled
                            sx={{
                              color: "white",
                              "&.Mui-checked": { color: "#4caf50" },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ color: "white" }}>
                            {day}
                          </Typography>
                        }
                        key={day}
                      />
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </>
        )}

        {role === "client" && hasClientData && (
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
              {clientData.preferredWorkoutType.length > 0 && (
                <Grid>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Предпочтительный вид тренеровок:
                    </span>
                  </Typography>
                  {clientsPreferredWorkoutTypes.map((type) => (
                    <Typography variant="body2" key={type._id} sx={{ mx: 7 }}>
                      -{type.name}
                    </Typography>
                  ))}
                </Grid>
              )}
              {clientData.trainingLevel && (
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Уровень подготвки:
                    </span>{" "}
                    {clientData.trainingLevel === "junior" && "Начальный"}
                    {clientData.trainingLevel === "middle" && "Средний"}
                    {clientData.trainingLevel === "advanced" && "Продвинутый"}
                  </Typography>
                </Grid>
              )}
              {clientData.physicalData && (
                <Grid sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Физические данный:
                    </span>{" "}
                    {clientData.physicalData}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default RegisterPreview;
