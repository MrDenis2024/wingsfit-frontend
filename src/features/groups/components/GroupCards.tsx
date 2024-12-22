import React from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { Alert, Typography } from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import GroupCard from "./GroupCard.tsx";
import { selectFetchGroups } from "../groupsSlice.ts";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";
import { ICourse } from "../../../types/courseTypes.ts";

interface Props {
  groups: IGroup[];
  courses: ICourse[];
}

const CourseCards: React.FC<Props> = ({ groups, courses }) => {
  const isLoading = useAppSelector(selectFetchGroups);
  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        courses.map((course) => {
          const courseGroups = groups.filter(
            (group) => group.course._id === course._id,
          );
          return (
            <Grid
              size={12}
              sx={{
                bgcolor: "rgba(140,139,139,0.05)",
                borderRadius: "8px",
                border: "silver 1px solid",
                p: 2,
              }}
              key={course._id}
            >
              <Grid
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap={"wrap"}
              >
                <Typography sx={{ mb: 1 }}>Курс: {course.title}</Typography>
                <Typography sx={{ mb: 1 }}>
                  {course.schedule.join(", ")}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Активных групп: {courseGroups.length}
                </Typography>
              </Grid>
              {courseGroups.map((group) => (
                <GroupCard key={group._id} group={group} />
              ))}
              {courseGroups.length === 0 && (
                <Alert severity="info" sx={{ width: "100%" }}>
                  Здесь пока нет никаких групп!
                </Alert>
              )}
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default CourseCards;
