import { Box, Grid2, TextField, Typography } from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  onSubmit: (certificates: { title: string; image: File }[]) => void;
  isLoading: boolean;
}

const AddTrainerCertificates = ({ onSubmit, isLoading }: Props) => {
  const [state, setState] = useState<{ title: string; image: File | null }>({
    title: "",
    image: null,
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title || !state.image) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    onSubmit([{ title: state.title, image: state.image }]);
    setState({ title: "", image: null });
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = event.target;
    const file = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  return (
    <Grid2 container spacing={2} sx={{ mt: 4 }}>
      <Grid2>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Добавить сертификат
        </Typography>
        <Box component="form" onSubmit={submitFormHandler}>
          <Grid2 container spacing={2}>
            <Grid2>
              <TextField
                label="Название сертификата"
                value={state.title}
                name="title"
                onChange={inputChangeHandler}
                fullWidth
                required
              />
            </Grid2>
            <Grid2>
              <FileInput
                label="Загрузить сертификат"
                name="image"
                onChange={fileInputChangeHandler}
              />
            </Grid2>
            <Grid2>
              <LoadingButton
                type="submit"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                <span>Сохранить</span>
              </LoadingButton>
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default AddTrainerCertificates;
