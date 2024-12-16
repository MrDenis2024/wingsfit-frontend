import React from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { Alert } from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import GroupCard from "./GroupCard.tsx";
import { selectFetchGroups } from "../groupsSlice.ts";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import Grid from "@mui/material/Grid2";

interface Props {
  groups: IGroup[];
}

const CourseCards: React.FC<Props> = ({ groups }) => {
  const isLoading = useAppSelector(selectFetchGroups);
  return (
    <Grid container spacing={2} sx={{ mb: 5 }}>
      {!isLoading ? (
        groups.length > 0 ? (
          groups.map((group) => (
            <Grid key={group._id} size={{ md: 4, lg: 3, sm: 6, xs: 12 }}>
              <GroupCard group={group} />
            </Grid>
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
  );
};

export default CourseCards;
