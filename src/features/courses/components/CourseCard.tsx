import React from "react";
import {Card} from "@mui/material";
import {ICourse} from "../../../types/courseTypes.ts";

interface Props {
  course: ICourse;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <Card>
      {course.title}
    </Card>
  );
};

export default CourseCard;