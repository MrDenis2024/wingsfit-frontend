import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectChangePasswordError } from "../userSlice.ts";
import { IChangePassword } from "../../../types/userTypes.ts";
import Grid from "@mui/material/Grid2";
import { Alert, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  onSubmit: (changePasswordMutation: IChangePassword) => void;
  onClose: () => void;
  isLoading: boolean;
}

const ChangePasswordForm: React.FC<Props> = ({
  onClose,
  onSubmit,
  isLoading,
}) => {
  const changePasswordError = useAppSelector(selectChangePasswordError);
  const [stateChangePassword, setStateChangePassword] =
    useState<IChangePassword>({
      oldPassword: "",
      newPassword: "",
    });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setStateChangePassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...stateChangePassword });
  };

  return (
    <Grid
      container
      direction="column"
      spacing={5}
      component="form"
      onSubmit={submitFormHandler}
      noValidate
      sx={{ mt: 3, width: "100%", mx: "auto" }}
    >
      <Grid container direction="column" spacing={2}>
        {changePasswordError && (
          <Alert severity="error">{changePasswordError.error}</Alert>
        )}
        <Grid>
          <TextField
            required
            type="password"
            label="Старый пароль"
            name="oldPassword"
            value={stateChangePassword.oldPassword}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid>
          <TextField
            required
            type="password"
            label="Новый пароль"
            name="newPassword"
            autoComplete="new-password"
            value={stateChangePassword.newPassword}
            onChange={inputChangeHandler}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{
            textTransform: "none",
            borderColor: "error.main",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            },
          }}
        >
          Отмена
        </Button>
        <LoadingButton type="submit" loading={isLoading} variant="contained">
          Сменить
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default ChangePasswordForm;
