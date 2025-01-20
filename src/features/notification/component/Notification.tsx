import * as React from "react";
import { Link, ListItem, ListItemText, Typography } from "@mui/material";
import { MessageNotification } from "../../../types/chatTypes.ts";
import {
  CourseToday,
  EndedSubscription,
} from "../../../types/notificationTypes.ts";
import { Lesson } from "../../../types/lessonTypes.ts";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/userSlice.ts";

interface Props {
  message?: MessageNotification;
  courseToday?: CourseToday;
  endedSubscription?: EndedSubscription;
  lesson?: Lesson;
}

const Notification: React.FC<Props> = ({
  message,
  courseToday,
  endedSubscription,
  lesson,
}) => {
  const user = useAppSelector(selectUser);
  let content: React.ReactNode;

  if (message) {
    content = (
      <Link
        href={`/clients/chats/${user?._id}`}
        sx={{
          p: 1,
          border: "1px solid gray",
          borderRadius: "5px",
          width: "100%",
          textDecoration: "none",
        }}
      >
        <ListItemText
          primary={`${message.groupChat ? message.groupChat.title + " - " : ""} ${message.author.firstName} ${message.author.lastName}`}
          secondary={
            <>
              <Typography component="span" sx={{ display: "block" }}>
                {message.message}
              </Typography>
              <Typography
                component="span"
                sx={{ textAlign: "right", display: "block" }}
              >
                {new Date(message.createdAt).toLocaleTimeString()}
              </Typography>
            </>
          }
        />
      </Link>
    );
  }

  if (endedSubscription) {
    content = (
      <Link
        href={`/courses/${endedSubscription.courseId}`}
        sx={{
          p: 1,
          border: "1px solid gray",
          borderRadius: "5px",
          width: "100%",
          textDecoration: "none",
        }}
      >
        <ListItemText
          primary={"Subscription"}
          secondary={endedSubscription.message}
        />
      </Link>
    );
  }

  if (courseToday) {
    content = (
      <Link
        href={`/courses/${courseToday.course._id}`}
        sx={{
          p: 1,
          border: "1px solid gray",
          borderRadius: "5px",
          width: "100%",
          textDecoration: "none",
        }}
      >
        <ListItemText
          primary={courseToday.group.title}
          secondary={`У вашей группы сегодня занятие в - ${courseToday.group.startTime}`}
        />
      </Link>
    );
  }

  if (lesson) {
    content = (
      <Link
        href={`/courses/${lesson.group.course._id}`}
        sx={{
          p: 1,
          border: "1px solid gray",
          borderRadius: "5px",
          width: "100%",
          textDecoration: "none",
        }}
      >
        <ListItemText
          primary={lesson.group.title}
          secondary={`У вашей группы началось занятие`}
        />
      </Link>
    );
  }

  return <ListItem alignItems="flex-start">{content}</ListItem>;
};

export default Notification;
