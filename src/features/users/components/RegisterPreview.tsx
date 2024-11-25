import { UserInfoMutation } from "../../../types/userTypes.ts";
import { TrainerProfileMutation } from "../../../types/trainerTypes.ts";
import { ClientProfileMutation } from "../../../types/clientTypes.ts";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
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
    <Grid container spacing={2} direction={"column"} sx={{ my: 5 }}>
      <Grid>
        <Typography variant="h6" component="div">
          Required Information
        </Typography>
      </Grid>
      <Grid>
        {Object.keys(requiredData).map((key, index) => {
          const value = requiredData[key as keyof typeof requiredData];
          return (
            <Grid key={index + key}>
              {typeof value === "string" && value !== "" && (
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {key}:
                  </span>{" "}
                  {value}
                </Typography>
              )}
              {typeof value === "object" && key === "timeZone" && (
                <Typography variant="body2" component="div">
                  <span
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
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
      {role === "trainer" && (
        <>
          <Grid>
            <Typography variant="h6" component="div">
              Optional Trainer Information
            </Typography>
          </Grid>
          <Grid>
            {Object.keys(optionalData).map((key, index) => {
              const value = optionalData[key as keyof typeof optionalData];
              return (
                <Grid key={index + key}>
                  {typeof value === "string" && value !== "" && (
                    <Typography variant="body2" component="div">
                      <span
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
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
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {key} :{" "}
                          </span>
                        </Typography>
                        {trainerCourses.map((type) => (
                          <Typography
                            variant="body2"
                            component="div"
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
            <Typography variant="h6" component="div">
              Client Information
            </Typography>
          </Grid>
          <Grid>
            {Object.keys(clientData).map((key, index) => {
              const value = clientData[key as keyof typeof clientData];
              return (
                <Grid key={index + key}>
                  {typeof value === "string" && (
                    <Typography variant="body2" component="div">
                      <span
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
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
                        <Typography variant="body2" component="div">
                          <span
                            style={{
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {key} :{" "}
                          </span>
                        </Typography>
                        {clientsPreferredWorkoutTypes.map((type) => (
                          <Typography
                            variant="body2"
                            component="div"
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
    </Grid>
  );
};

export default RegisterPreview;
