import React from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { CircularProgress, Grid2 } from "@mui/material";
import { IGroup } from "../../../types/groupTypes.ts";
import GroupCard from "./GroupCard.tsx";
import { selectFetchGroups } from "../groupsSlice.ts";

const cardBoxSx = {
  width: {
    xs: "100%",
    sm: "50%",
    md: "50%",
    lg: "33%",
  },
};

interface Props {
  groups: IGroup[];
}

const CourseCards: React.FC<Props> = ({ groups }) => {
  const isLoading = useAppSelector(selectFetchGroups);
  return (
    <Grid2 container justifyContent="space-around" alignItems="center">
      {!isLoading ? (
        groups.map((group) => (
          <Grid2 key={group._id} sx={cardBoxSx}>
            <GroupCard group={group} />
          </Grid2>
        ))
      ) : (
        <CircularProgress />
      )}
    </Grid2>
  );
};

export default CourseCards;
