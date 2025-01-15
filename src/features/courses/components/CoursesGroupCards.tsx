import React, {useState} from "react";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {IGroup} from "../../../types/groupTypes.ts";
import {CourseWaitList} from "../../../types/courseTypes.ts";
import {
    getOneCourse,
    joinToCourseGroup,
    migrateToAnotherCourseGroup,
} from "../coursesThunks.ts";
import {toast} from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectAddingToCourse} from "../coursesSlice.ts";
import {selectUser} from "../../users/userSlice.ts";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import {GlobalError} from "../../../types/userTypes.ts";

interface Props {
    group: IGroup;
    courseId: string;
    waitListItem: CourseWaitList | undefined;
    userIsClient: boolean;
}

const CoursesGroupCards: React.FC<Props> = ({
                                                group,
                                                waitListItem,
                                                courseId,
                                                userIsClient,
                                            }) => {
    const mediaQuery500 = useMediaQuery("(min-width:500px)");
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAddingToCourse);
    const user = useAppSelector(selectUser);
    const [confirmOpen, setConfirmOpen] = useState(false);

    let actionBtn = <></>;

    const handleClickGroup = () => {
        setConfirmOpen(true);
    };
    const enterToGroup = async () => {
        try {
            setConfirmOpen(false);
            if (!userIsClient) {
                await dispatch(
                    joinToCourseGroup({id: courseId, groupId: group._id}),
                ).unwrap();
            } else {
                await dispatch(
                    migrateToAnotherCourseGroup({id: courseId, groupId: group._id}),
                ).unwrap();
            }
            toast.success("Запрос отправлен, ожидайте подтверждение тренера!");
            dispatch(getOneCourse(courseId));
        } catch (e) {
            toast.error((e as GlobalError).error || "Произошла ошибка");
        }
    };

    if (user?.role === "client") {
        if (!userIsClient) {
            actionBtn = (
                <LoadingButton
                    loading={loading === group._id}
                    size="small"
                    variant="contained"
                    disabled={!!waitListItem || (!!loading && loading !== group._id)}
                    onClick={() => handleClickGroup()}
                >
                    {waitListItem?.favoriteGroup === group._id ? (
                        <span>Заявка подана</span>
                    ) : (
                        <span>Вступить в группу</span>
                    )}
                </LoadingButton>
            );
        } else {
            const userOnGroup = group.clients.find(
                (item) => item.client._id === user?._id,
            );
            actionBtn = (
                <LoadingButton
                    loading={loading === group._id}
                    size="small"
                    variant="contained"
                    disabled={
                        !!waitListItem ||
                        !!userOnGroup ||
                        (!!loading && loading !== group._id)
                    }
                    onClick={() => handleClickGroup()}
                >
                    {!userOnGroup ? (
                        waitListItem?.favoriteGroup === group._id ? (
                            <span>Заявка подана</span>
                        ) : (
                            <span>Перейти в группу</span>
                        )
                    ) : (
                        <span>Ваша группа</span>
                    )}
                </LoadingButton>
            );
        }
    }

    return (
        <>
            <Card
                sx={{
                    width: mediaQuery500 ? "100%" : "210px",
                    display: mediaQuery500 ? "flex" : "block",
                    justifyContent: "space-between",
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: mediaQuery500 ? "row" : "column",
                        gap: mediaQuery500 ? "20px" : "10px",
                        flexWrap: "wrap",
                        alignItems: mediaQuery500 ? "center" : "start",
                    }}
                >
                    <Typography variant="h5" sx={{fontSize: "16px"}} component="div">
                        {group.title}
                    </Typography>
                    <Typography sx={{color: "text.secondary", fontSize: 14}}>
                        Уровень: {group.trainingLevel}
                    </Typography>
                    <Typography sx={{color: "text.secondary", fontSize: 14}}>
                        Начало: {group.startTime}
                    </Typography>
                    <Typography sx={{color: "text.secondary", fontSize: 14}}>
                        Время: {group.scheduleLength}
                    </Typography>
                    <Typography sx={{color: "text.secondary", fontSize: 14}}>
                        Кол-во человек: {group.maxClients - group.clients.length}
                    </Typography>
                </CardContent>
                <CardActions>{actionBtn}</CardActions>
            </Card>
            <CustomConfirmDialog
                open={confirmOpen}
                title="Вступление в группу"
                description="Вы уверены, что хотите подать заявку на вступление в эту группу? Если подадите заявку, то Вы не сможете подать заявку в другие группы этого курса до подтверждения тренера."
                confirmText="Подтвердить"
                cancelText="Отмена"
                onConfirm={() => enterToGroup()}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
};

export default CoursesGroupCards;
