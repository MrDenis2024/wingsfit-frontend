import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {selectCourseTypes} from "../../features/CourseTypes/CourseTypesSlice.ts";

interface Props {
  courseType: string;
  onRemove: () => void;
}

const TagCard: React.FC<Props> = ({ courseType, onRemove }) => {
  const courseTypes = useAppSelector(selectCourseTypes);

  const findCourseTypes = (typeId: string) => {
    return courseTypes
      .filter((course) => course._id === typeId)
      .map((course) => course.name);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid lightblue"
      padding="8px"
      borderRadius="8px"
    >
      <Typography variant="body1" mr={1}>
        {findCourseTypes(courseType)}
      </Typography>
      <Button
        size="small"
        color="error"
        onClick={onRemove}
      >
        ✕
      </Button>
    </Box>
  );
};

export default TagCard;