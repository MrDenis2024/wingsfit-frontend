import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  blockCourseType,
  fetchCourseTypes,
  publicCourseType,
} from "../../../CourseTypes/CourseTypesThunks.ts";
import {
  selectBlockCourseTypeLoading,
  selectCourseTypes,
  selectPublicCourseTypeLoading,
} from "../../../CourseTypes/CourseTypesSlice.ts";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomConfirmDialog from "../../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import { toast } from "react-toastify";
import { GlobalError } from "../../../../types/userTypes.ts";
import NewCourseType from "../../../CourseTypes/NewCourseType.tsx";
import Modal from "../../../../UI/Modal/Modal.tsx";

const AdminCourseType = () => {
  const dispatch = useAppDispatch();
  const courseTypes = useAppSelector(selectCourseTypes);
  const publicLoading = useAppSelector(selectPublicCourseTypeLoading);
  const blockLoading = useAppSelector(selectBlockCourseTypeLoading);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "publish" | "block" | null
  >(null);
  const [typeId, setTypeId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCourseTypes());
  }, [dispatch]);

  const handlePublish = async (typeId: string) => {
    try {
      await dispatch(publicCourseType(typeId)).unwrap();
      dispatch(fetchCourseTypes());
      toast.success("Тип курса успешно опубликован");
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    }
  };

  const handleBlock = async (typeId: string) => {
    try {
      await dispatch(blockCourseType(typeId)).unwrap();
      dispatch(fetchCourseTypes());
      toast.success("Тип курса успешно заблокирован");
    } catch (error) {
      toast.error((error as GlobalError).error || "Произошла ошибка");
    }
  };

  const openConfirmDialog = (action: "publish" | "block", typeId: string) => {
    setCurrentAction(action);
    setTypeId(typeId);
    setConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    setConfirmOpen(false);
    if (currentAction === "publish" && typeId) {
      await handlePublish(typeId);
    } else if (currentAction === "block" && typeId) {
      await handleBlock(typeId);
    }
    setTypeId(null);
    setCurrentAction(null);
  };

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          Типы курсов
        </Typography>
        <Button
          onClick={() => setModalOpen(true)}
          sx={{
            fontWeight: "bold",
            fontSize: "14px",
            px: 1,
            height: "40px",
          }}
          variant="outlined"
        >
          Новый тип курса
        </Button>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Название</strong>
            </TableCell>
            <TableCell>
              <strong>Опубликован</strong>
            </TableCell>
            <TableCell>
              <strong>Заблокирован</strong>
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>Действия</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseTypes.map((type) => (
            <TableRow key={type._id}>
              <TableCell>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </TableCell>
              <TableCell>{type.isPublished ? "Да" : "Нет"}</TableCell>
              <TableCell>{type.isBlocked ? "Да" : "Нет"}</TableCell>
              <TableCell>
                <Grid container justifyContent="space-around">
                  <Button
                    variant="outlined"
                    onClick={() => openConfirmDialog("publish", type._id)}
                    disabled={
                      publicLoading === type._id ||
                      type.isBlocked ||
                      type.isPublished
                    }
                  >
                    {publicLoading === type._id && (
                      <CircularProgress size={24} />
                    )}
                    Опубликовать
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => openConfirmDialog("block", type._id)}
                    disabled={
                      type.isPublished ||
                      blockLoading === type._id ||
                      type.isBlocked
                    }
                  >
                    {blockLoading === type._id && (
                      <CircularProgress size={24} />
                    )}
                    Заблокировать
                  </Button>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomConfirmDialog
        open={confirmOpen}
        title={
          currentAction === "publish"
            ? "Опубликовать курс"
            : "Заблокировать курс"
        }
        description={
          currentAction === "publish"
            ? "Вы уверены, что хотите опубликовать данный курс?"
            : "Вы уверены, что хотите заблокировать данный курс?"
        }
        confirmText={
          currentAction === "publish" ? "Опубликовать" : "Заблокировать"
        }
        cancelText="Отмена"
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmOpen(false)}
      />
      <Modal
        title={"Новый тип курса"}
        onClose={() => setModalOpen(false)}
        show={modalOpen}
      >
        <NewCourseType onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
};

export default AdminCourseType;
