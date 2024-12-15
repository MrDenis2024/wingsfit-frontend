import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  selectLoadingStatisticClient,
  selectStatisticClient,
} from "../trainerStatisticSlice.ts";
import { useEffect } from "react";
import { getStatisticClient } from "../trainerStatisticThunks.ts";

import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingIndicator from "../../../../UI/LoadingIndicator/LoadingIndicator.tsx";

const ClientStatistic = () => {
  const dispatch = useAppDispatch();
  const statisticClient = useAppSelector(selectStatisticClient);
  const isLoading = useAppSelector(selectLoadingStatisticClient);

  useEffect(() => {
    dispatch(getStatisticClient());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {statisticClient.length > 0 ? (
            <>
              <Typography variant="h5" textAlign="center" marginBottom={2}>
                Клиенты
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>ФИО</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Телефон</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Группа</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statisticClient.map((client, index) => (
                      <TableRow
                        key={client._id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                        }}
                      >
                        <TableCell>
                          {client.name} {client.lastName}
                        </TableCell>
                        <TableCell>{client.phoneNumber}</TableCell>
                        <TableCell>{client.groups}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Alert severity="info" sx={{ width: "100%" }}>
              У вас ещё нет клиентов
            </Alert>
          )}
        </>
      )}
    </>
  );
};

export default ClientStatistic;
