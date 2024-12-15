import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  selectLoadingStatisticGroup,
  selectStatisticGroup,
} from "../trainerStatisticSlice.ts";
import { getStatisticGroup } from "../trainerStatisticThunks.ts";
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

const GroupStatistic = () => {
  const dispatch = useAppDispatch();
  const statisticGroup = useAppSelector(selectStatisticGroup);
  const isLoading = useAppSelector(selectLoadingStatisticGroup);

  useEffect(() => {
    dispatch(getStatisticGroup());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {statisticGroup.length > 0 ? (
            <>
              <Typography variant="h5" textAlign="center" marginBottom={2}>
                Группы
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Название группы</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Время тренеровки</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Участники группы</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statisticGroup.map((group, index) => (
                      <TableRow
                        key={group._id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                        }}
                      >
                        <TableCell>{group.title}</TableCell>
                        <TableCell>{group.startTime}</TableCell>
                        <TableCell
                          sx={{
                            width: "40%",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                        >
                          {group.clients
                            .map(
                              (client) =>
                                `${client.firstName} ${client.lastName}`,
                            )
                            .join(", ")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Alert severity="info" sx={{ width: "100%" }}>
              У вас ещё нет групп
            </Alert>
          )}
        </>
      )}
    </>
  );
};

export default GroupStatistic;
