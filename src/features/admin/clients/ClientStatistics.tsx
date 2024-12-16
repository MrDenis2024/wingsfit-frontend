import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import UserStatistics from "../components/UserStatistics.tsx";
import { fetchAdminClients } from "./adminClientsThunks.ts";
import {
  selectActiveClient,
  selectAdminClients,
  selectAdminClientsFetching,
  selectTotalClient,
} from "./adminClientsSlice.ts";
import LoadingIndicator from "../../../UI/LoadingIndicator/LoadingIndicator.tsx";

const ClientStatistics = () => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(selectAdminClients);
  const totalClients = useAppSelector(selectTotalClient);
  const activeClients = useAppSelector(selectActiveClient);
  const adminClientsFetching = useAppSelector(selectAdminClientsFetching);

  useEffect(() => {
    dispatch(fetchAdminClients());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ fontSize: { xs: "20px", sm: "24px" } }}
      >
        Client Statistics
      </Typography>
      {adminClientsFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <LoadingIndicator />
        </Box>
      ) : (
        <>
          <Stack mt={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "16px", sm: "20px" } }}
            >
              Total Registered Clients: {totalClients}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "16px", sm: "20px" } }}
            >
              Active Clients Last Month: {activeClients}
            </Typography>
          </Stack>

          <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              p={1}
              justifyContent="space-between"
              sx={{
                display: { xs: "none", sm: "flex" },
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              <Typography sx={{ fontWeight: "bold", width: "20%" }}>
                Name
              </Typography>
              <Typography sx={{ fontWeight: "bold", width: "15%" }}>
                Role
              </Typography>
              <Typography sx={{ fontWeight: "bold", width: "20%" }}>
                Created At
              </Typography>
              <Typography sx={{ fontWeight: "bold", width: "20%" }}>
                Updated At
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  flexGrow: 1,
                  textAlign: "center",
                  ms: 0,
                }}
              >
                Last Activity
              </Typography>
            </Stack>
            <Divider sx={{ display: { xs: "none", sm: "block" } }} />
            {clients.map((client, index) => (
              <UserStatistics
                key={client._id}
                user={client.user}
                index={index}
                totalUsers={clients.length}
              />
            ))}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default ClientStatistics;
