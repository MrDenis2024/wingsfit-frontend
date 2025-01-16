import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectLoadingStatisticGroup} from "../trainerStatisticSlice.ts";
import LoadingIndicator from "../../../../UI/LoadingIndicator/LoadingIndicator.tsx";
import {
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {fetchCourses} from "../../../courses/coursesThunks.ts";
import {selectCourses} from "../../../courses/coursesSlice.ts";

const CourseStatistic = () => {
    const dispatch = useAppDispatch();
    const statisticCourses = useAppSelector(selectCourses);
    const isLoading = useAppSelector(selectLoadingStatisticGroup);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const getPersonWord = (count: number): string => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'человек';
        } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            return 'человека';
        } else {
            return 'человеков';
        }
    }

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    {statisticCourses.length > 0 ? (
                        <>
                            <TableContainer component={Paper} sx={{border:'1px solid #ECECEC', borderRadius:'20px'}}>
                                <Typography variant="h5" textAlign="left" marginBottom={2} sx={{margin:'20px 0 10px 15px'}}>
                                    Курсы
                                </Typography>
                                <Table>
                                    <TableHead sx={{borderBottom:'1px solid #ECECEC', backgroundColor:'#F5F5F5'}}>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Название курса</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Тип курса</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Формат</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Доступные дни</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Список ожидания</strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {statisticCourses.map((group) => (
                                            <TableRow
                                                key={group._id}
                                            >
                                                <TableCell>{group.title}</TableCell>
                                                <TableCell>{group.courseType.name}</TableCell>
                                                <TableCell>{group.format}</TableCell>
                                                <TableCell>{group.schedule.join(' ')}</TableCell>
                                                <TableCell>
                                                    {group.waitList.length === 0
                                                        ? 'Список пуст'
                                                        : `${group.waitList.length} ${getPersonWord(group.waitList.length)} ожидает`}
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

export default CourseStatistic;