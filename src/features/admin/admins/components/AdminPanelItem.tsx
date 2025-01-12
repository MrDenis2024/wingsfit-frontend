import React, { useState } from "react";
import { ITrainer } from "../../../../types/trainerTypes.ts";
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { ICourse, ICourseType } from "../../../../types/courseTypes.ts";
import { IClient } from "../../../../types/clientTypes.ts";
import { findCourseTypes } from "../../../../constants.ts";
import { IGroup } from "../../../../types/groupTypes.ts";
import { IUser } from "../../../../types/userTypes.ts";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { deleteGroup, fetchAllGroups } from "../../../groups/groupsThunk.ts";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectDeleteGroupLoading } from "../../../groups/groupsSlice.ts";
import CustomConfirmDialog from "../../../../UI/CustomConfirmDialog/CustomConfirmDialog.tsx";
import { selectDeleteCourseLoading } from "../../../courses/coursesSlice.ts";
import { deleteCourse, fetchCourses } from "../../../courses/coursesThunks.ts";

interface Props {
  users: IUser[];
  trainers: ITrainer[];
  coursesType: ICourseType[];
  clients: IClient[];
  groups: IGroup[];
  courses: ICourse[];
}

const AdminPanelItem: React.FC<Props> = ({
  users,
  trainers,
  coursesType,
  clients,
  groups,
  courses,
}) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("users");
  const deleteGroupLoading = useAppSelector(selectDeleteGroupLoading);
  const courseDeleteLoading = useAppSelector(selectDeleteCourseLoading);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "group" | "course";
    id: string;
  } | null>(null);

  const handleDelete = async () => {
    if (itemToDelete) {
      const { type, id } = itemToDelete;
      try {
        if (type === "group") {
          await dispatch(deleteGroup(id)).unwrap();
          dispatch(fetchAllGroups());
          toast.success("Группа успешно удалена");
        } else if (type === "course") {
          await dispatch(deleteCourse(id)).unwrap();
          dispatch(fetchCourses());
          dispatch(fetchAllGroups());
          toast.success("Курс успешно удалён");
        }
      } catch {
        toast.error(
          `Произошла ошибка при удалении ${type === "group" ? "группы" : "курса"}`,
        );
      } finally {
        setConfirmOpen(false);
        setItemToDelete(null);
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Пользователи
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Имя пользователя</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Роль</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Фамилия Имя</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Пол</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Часовой пояс</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Номер телефона</strong>
                  </TableCell>
                  <TableCell>
                    <strong>День рождения</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>
                      {user.timeZone ? user.timeZone.label : "Не указан"}
                    </TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.dateOfBirth}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      case "trainers":
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Тренеры
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Фамилия Имя</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Тип курса</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Рейтинг</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Специализация</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Опыт</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Описание</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Доступные дни</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainers.map((trainer) => (
                  <TableRow key={trainer._id}>
                    <TableCell>
                      {trainer.user.firstName} {trainer.user.lastName}
                    </TableCell>
                    <TableCell>
                      {trainer.courseTypes
                        .map((courseTypeId) => {
                          const courseType = coursesType.find(
                            (course) => course._id === courseTypeId,
                          );
                          return courseType
                            ? courseType.name
                            : "Неизвестный тип курса";
                        })
                        .join(", ")}
                    </TableCell>
                    <TableCell>{trainer.rating}</TableCell>
                    <TableCell>{trainer.specialization}</TableCell>
                    <TableCell>{trainer.experience}</TableCell>
                    <TableCell>{trainer.description}</TableCell>
                    <TableCell>{trainer.availableDays?.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      case "clients":
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Клиенты
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Фамилия Имя</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Типы тренировок</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Уровень тренировок</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Физические данные</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client._id}>
                    <TableCell>
                      {client.user.firstName} {client.user.lastName}
                    </TableCell>
                    <TableCell>
                      {findCourseTypes(
                        coursesType,
                        ...client.preferredWorkoutType,
                      )
                        .map((type) => type.name)
                        .join(", ")}
                    </TableCell>
                    <TableCell>{client.trainingLevel}</TableCell>
                    <TableCell>{client.physicalData}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      case "groups":
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Группы
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Название группы</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Курс</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Клиенты</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Начало</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Уровень тренировки</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Длительность</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Максимальное количество клиентов</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group._id}>
                    <TableCell>{group.title}</TableCell>
                    <TableCell>
                      {group.course ? group.course.title : "Нет курса"}
                    </TableCell>
                    <TableCell>
                      {group.clients.map((client) => (
                        <div key={client.client._id}>
                          {client.client.firstName} {client.client.lastName}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{group.startTime}</TableCell>
                    <TableCell>{group.trainingLevel}</TableCell>
                    <TableCell>{group.scheduleLength}</TableCell>
                    <TableCell>{group.maxClients}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setItemToDelete({ type: "group", id: group._id });
                          setConfirmOpen(true);
                        }}
                        disabled={
                          deleteGroupLoading
                            ? deleteGroupLoading === group._id
                            : false
                        }
                      >
                        {deleteGroupLoading === group._id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <DeleteSweepIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      case "courses":
        return (
          <>
            <Typography variant="h5" gutterBottom>
              Курсы
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Тип курса</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Название курса</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Описание</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Формат</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Расписание</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Цена</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell>{course.courseType.name}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{course.format}</TableCell>
                    <TableCell>{course.schedule.join(", ")}</TableCell>
                    <TableCell>{course.price}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setItemToDelete({ type: "course", id: course._id });
                          setConfirmOpen(true);
                        }}
                        disabled={
                          courseDeleteLoading
                            ? courseDeleteLoading === course._id
                            : false
                        }
                      >
                        {courseDeleteLoading === course._id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <DeleteSweepIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      default:
        return (
          <Typography variant="h6" color="textSecondary" align="center">
            Выбранная вкладка не поддерживается.
          </Typography>
        );
    }
  };
  const getDescription = () => {
    if (itemToDelete?.type === "group") {
      return "Вы уверены, что хотите удалить данную группу? Так же удалятся и занятия к этой группы.";
    } else if (itemToDelete?.type === "course") {
      return "Вы уверены, что хотите удалить данный курс? Удалятся так же группы в данном курсе и все занятия.";
    }
    return "";
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "#44a9ca", marginBottom: "15px" }}
      >
        <Toolbar>
          <Button color="inherit" onClick={() => setActiveTab("users")}>
            Пользователи
          </Button>
          <Button color="inherit" onClick={() => setActiveTab("trainers")}>
            Тренеры
          </Button>
          <Button color="inherit" onClick={() => setActiveTab("clients")}>
            Клиенты
          </Button>
          <Button color="inherit" onClick={() => setActiveTab("groups")}>
            Группы
          </Button>
          <Button color="inherit" onClick={() => setActiveTab("courses")}>
            Курсы
          </Button>
        </Toolbar>
      </AppBar>
      {renderContent()}
      <CustomConfirmDialog
        open={confirmOpen}
        title={`Удалить ${itemToDelete?.type === "group" ? "группу" : "курс"}`}
        description={getDescription()}
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default AdminPanelItem;
