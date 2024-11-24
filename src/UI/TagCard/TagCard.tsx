import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {CourseTypeFields} from "../../types/courseTypes.ts";

interface Props {
  courseType: CourseTypeFields;
  onRemove: (id: string) => void;
}

const TagCard: React.FC<Props> = ({ courseType, onRemove }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid lightblue"
      padding="8px"
      borderRadius="8px"
    >
      <Typography variant="body1" mr={1}>
        {courseType.name}
      </Typography>
      <Button
        size="small"
        color="error"
        onClick={() => onRemove(courseType._id)}
      >
        ✕
      </Button>
    </Box>
  );
};

export default TagCard;