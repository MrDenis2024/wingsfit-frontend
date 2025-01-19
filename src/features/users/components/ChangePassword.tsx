import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectChangePasswordLoading } from "../userSlice.ts";
import { toast } from "react-toastify";
import { IChangePassword } from "../../../types/userTypes.ts";
import { changePassword } from "../userThunk.ts";
import { Container } from "@mui/material";
import ChangePasswordForm from "./ChangePasswordForm.tsx";

interface Props {
  onClose: () => void;
}

const ChangePassword: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const changePasswordLoading = useAppSelector(selectChangePasswordLoading);

  const onFormSubmit = async (changePasswordMutation: IChangePassword) => {
    try {
      const newPassword = {
        oldPassword: changePasswordMutation.oldPassword.trim(),
        newPassword: changePasswordMutation.newPassword.trim(),
      };
      await dispatch(changePassword(newPassword)).unwrap();
      toast.success("Пароль успешно изменен");
      onClose();
    } catch {
      toast.error("Произошла ошибка");
    }
  };
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <ChangePasswordForm
        onSubmit={onFormSubmit}
        isLoading={changePasswordLoading}
        onClose={onClose}
      />
    </Container>
  );
};

export default ChangePassword;
