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

  useEffect(() => {
    console.log(statisticClient)
  }, [statisticClient]);
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {statisticClient.length > 0 ? (
            <>
              <TableContainer component={Paper} sx={{border:'1px solid #ECECEC', borderRadius:'20px'}}>
                <Typography variant="h5" textAlign="left" marginBottom={2} sx={{margin:'20px 0 10px 15px'}}>
                  Клиенты
                </Typography>
                <Table>
                  <TableHead sx={{borderBottom:'1px solid #ECECEC', backgroundColor:'#F5F5F5'}}>
                    <TableRow>
                      <TableCell>
                        <strong>ФИО</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Группа</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Стастус</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Появление в группе</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Окончание подписки</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statisticClient.map((client) => (
                      <TableRow
                        key={client._id}
                      >
                        <TableCell>
                          {client.name} {client.lastName}
                        </TableCell>
                        <TableCell>{client.groupTitle}</TableCell>
                        <TableCell>{client.status}</TableCell>
                        <TableCell>{new Date(client.addedAt).toLocaleString()}</TableCell>
                        <TableCell>{new Date(client.subscribeEnd).toLocaleString()}</TableCell>

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
