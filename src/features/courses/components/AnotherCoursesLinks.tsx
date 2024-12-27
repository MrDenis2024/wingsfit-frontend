import React from 'react';
import {Card, CardActionArea, CardMedia} from "@mui/material";
import {ICourse} from "../../../types/courseTypes.ts";
import {NavLink} from "react-router-dom";
import {apiURL} from "../../../constants.ts";
import imageNotFound from "/src/assets/images/user-icon-not-found.png";


interface Props {
    courses:ICourse[];
}

const AnotherCoursesLinks : React.FC<Props> = ({courses}) => {
    return (<>
        {courses.map(course => (
            <Card sx={{width: "100px"}} key={course._id}>
                <CardActionArea component={NavLink} to={`/courses/${course._id}`}>
                    <CardMedia component="img"
                               height="100"
                               sizes={'cover'}
                               image={course.image?`${apiURL}/${course.image}`:imageNotFound}
                               alt="Course Image"/>
                </CardActionArea>
            </Card>
        ))}
    </>
    );
};

export default AnotherCoursesLinks;