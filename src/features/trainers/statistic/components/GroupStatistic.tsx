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
              <TableContainer component={Paper} sx={{border:'1px solid #ECECEC', borderRadius:'20px'}}>
                <Typography variant="h5" textAlign="left" marginBottom={2} sx={{margin:'20px 0 10px 15px'}}>
                  Группы
                </Typography>
                <Table>
                  <TableHead sx={{borderBottom:'1px solid #ECECEC', backgroundColor:'#F5F5F5'}}>
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
                    {statisticGroup.map((group) => (
                      <TableRow
                        key={group._id}
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
                          <div style={{ marginTop: '8px' , fontSize: '12px', color: '#666'}}>
                            Общее: <strong>{group.clients.length}</strong> / Максимум: <strong>{group.maxClients}</strong> /
                            Заморожено: <strong>{group.clients.filter((el) => el.status === 'frozen').length}</strong>
                          </div>
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
