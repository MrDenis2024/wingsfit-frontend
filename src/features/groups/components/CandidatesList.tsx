import {CourseWaitList} from "../../../types/courseTypes.ts";
import React, {useState} from "react";
import {
    Alert,
    Button,
    FormControl,
    IconButton,
    List,
    ListItem,
    TextField,
    Typography,
} from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    approveJoinToCourseGroup,
    declineJoinToCourseGroup,
    fetchCourses,
} from "../../courses/coursesThunks.ts";
import {selectUser} from "../../users/userSlice.ts";
import CustomConfirmDialog from "../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import Modal from "../../../UI/Modal/Modal.tsx";
import {fetchAllGroups} from "../groupsThunk.ts";
import {toast} from "react-toastify";
import {GlobalError} from "../../../types/userTypes.ts";
import {selectWaitlistManageLoading} from "../../courses/coursesSlice.ts";

interface Props {
    courseId: string;
    candidates: CourseWaitList[];
}

const CandidatesList: React.FC<Props> = ({candidates, courseId}) => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectWaitlistManageLoading);
    const [confirmOpen, setConfirmOpen] = useState<string | false>(false);
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [clientToApprove, setClientToDApprove] = useState<{
        id: string;
        firstName: string;
        lastName: string;
    } | null>(null);
    const [subsEndDate, setSubsEndDate] = useState<string>("");

    const declineCandidate = async (waitListId: string) => {
        try {
            setConfirmOpen(false);
            await dispatch(
                declineJoinToCourseGroup({id: courseId, waitListId: waitListId}),
            ).unwrap();
            toast.success("Заявка отклонена!");
            await dispatch(fetchCourses(user?._id));
            await dispatch(fetchAllGroups());
        } catch (e) {
            toast.error((e as GlobalError).error || "Произошла ошибка");
        }
    };
    const handleOpenApproveDialog = (
        waitListId: string,
        firstName: string,
        lastName: string,
    ) => {
        setClientToDApprove({
            id: waitListId,
            firstName,
            lastName,
        });
        setApproveModalOpen(true);
    };

    const handleApproveCandidate = async () => {
        setApproveModalOpen(false);
        if (clientToApprove && subsEndDate !== "") {
            try {
                await dispatch(
                    approveJoinToCourseGroup({
                        id: courseId,
                        waitListId: clientToApprove.id,
                        subscribeEndDate: subsEndDate,
                    }),
                ).unwrap();
                toast.success("Заявка принята, пользователь успешно добавлен в группу");
                await dispatch(fetchCourses(user?._id));
                await dispatch(fetchAllGroups());
            } catch (e) {
                toast.error((e as GlobalError).error || "Произошла ошибка");
            }
        }
    };

    return (
        <>
            <List>
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <ListItem
                            key={candidate._id}
                            sx={{display: "flex", justifyContent: "space-between", borderBottom: '1px solid black'}}
                        >
                            <Link
                                to={`/clients/${candidate.user._id}`}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <Typography variant="body1">
                                    {candidate.user.lastName} {candidate.user.firstName}
                                </Typography>
                            </Link>

                            <Typography variant="body1">{candidate.status}</Typography>
                            <Typography variant="body1">{new Date(candidate.createdAt).toLocaleString()}</Typography>
                            <Grid>
                                <IconButton
                                    color="primary"
                                    disabled={loading === candidate._id}
                                    onClick={() => {
                                        handleOpenApproveDialog(
                                            candidate._id,
                                            candidate.user.firstName,
                                            candidate.user.lastName,
                                        );
                                    }}
                                    sx={{
                                        fontSize: {xs: "16px", sm: "24px"},
                                    }}
                                >
                                    <CheckIcon/>
                                </IconButton>
                                <IconButton
                                    color="error"
                                    disabled={loading === candidate._id}
                                    onClick={() => setConfirmOpen(candidate._id)}
                                    sx={{
                                        fontSize: {xs: "16px", sm: "24px"},
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </ListItem>
                    ))
                ) : (
                    <Alert>Cписок пуст</Alert>
                )}
            </List>
            <CustomConfirmDialog
                open={!!confirmOpen}
                title="Отклонить"
                description="Вы уверены, что хотите отклонить заявку данного кандадата? При отклонении пользователь будет удален из списка ожидания."
                confirmText="Подтвердить"
                cancelText="Отмена"
                onConfirm={() => declineCandidate(confirmOpen as string)}
                onCancel={() => setConfirmOpen(false)}
            />
            <Modal
                show={approveModalOpen}
                onClose={() => setApproveModalOpen(false)}
                title={`Подтвердить подписку клиенту ${clientToApprove?.firstName} ${clientToApprove?.lastName}? Чтобы подтвердить укажите дату окончания подписки.`}
            >
                <Grid>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Дата окончания подписки"
                            type="date"
                            value={subsEndDate}
                            onChange={(e) => setSubsEndDate(e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Button onClick={() => setApproveModalOpen(false)} color="primary">
                        Отмена
                    </Button>
                    <Button
                        onClick={handleApproveCandidate}
                        color="primary"
                        disabled={!subsEndDate}
                    >
                        Подтвердить
                    </Button>
                </Grid>
            </Modal>
        </>
    );
};

export default CandidatesList;
