import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { IUser } from "../../../types/userTypes.ts";

interface UserStatisticsProps {
  user: IUser;
  index: number;
  totalUsers: number;
}

const UserStatistics: React.FC<UserStatisticsProps> = ({
  user,
  index,
  totalUsers,
}) => {
  return (
    <Box key={user._id}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        p={1}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <Typography sx={{ width: { sm: "20%" } }}>
          <Box
            component="span"
            sx={{ display: { xs: "inline", sm: "none" }, fontWeight: "bold" }}
          >
            Name:{" "}
          </Box>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography sx={{ width: { sm: "15%" } }}>
          <Box
            component="span"
            sx={{ display: { xs: "inline", sm: "none" }, fontWeight: "bold" }}
          >
            Role:{" "}
          </Box>
          {user.role}
        </Typography>
        <Typography sx={{ width: { sm: "20%" } }}>
          <Box
            component="span"
            sx={{ display: { xs: "inline", sm: "none" }, fontWeight: "bold" }}
          >
            Created At:{" "}
          </Box>
          {/*{new Date(user.createdAt).toLocaleDateString()}*/}
        </Typography>
        <Typography sx={{ width: { sm: "20%" } }}>
          <Box
            component="span"
            sx={{ display: { xs: "inline", sm: "none" }, fontWeight: "bold" }}
          >
            Updated At:{" "}
          </Box>
          {/*{new Date(user.updatedAt).toLocaleDateString()}*/}
        </Typography>
        <Typography
          sx={{ flexGrow: 1, textAlign: { xs: "left", sm: "center" } }}
        >
          <Box
            component="span"
            sx={{ display: { xs: "inline", sm: "none" }, fontWeight: "bold" }}
          >
            Last Activity:{" "}
          </Box>
          {/*{new Date(user.lastActivity).toLocaleDateString()}*/}
        </Typography>
      </Stack>
      {index < totalUsers - 1 && <Divider />}
    </Box>
  );
};

export default UserStatistics;
