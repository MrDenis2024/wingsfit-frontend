import {
  Box,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput.tsx";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid2";

interface Props {
  onSubmit: (certificates: { title: string; image: File }[]) => void;
  isLoading: boolean;
}

const AddTrainerCertificates = ({ onSubmit, isLoading }: Props) => {
  const [state, setState] = useState<{ title: string; image: File | null }>({
    title: "",
    image: null,
  });
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const toggleStatus = () => setIsStatusOpen((prev) => !prev);

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
    <Grid container spacing={2}>
      <Grid onClick={toggleStatus}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            cursor: "pointer",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Добавить сертификат
          </Typography>
          <IconButton>
            {isStatusOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={isStatusOpen}>
          <Box
            component="form"
            onSubmit={submitFormHandler}
            onClick={(e) => e.stopPropagation()}
          >
            <Grid container spacing={2} flexDirection="column">
              <Box>
                <Grid>
                  <TextField
                    label="Название сертификата"
                    value={state.title}
                    name="title"
                    onChange={inputChangeHandler}
                    required
                    sx={{ width: "100%", maxWidth: "300px", mb: 2 }}
                  />
                </Grid>
                <Grid sx={{ width: "450px" }}>
                  <FileInput
                    label="Загрузить сертификат"
                    name="image"
                    onChange={fileInputChangeHandler}
                  />
                </Grid>
              </Box>
              <Grid>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  <span>Сохранить</span>
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default AddTrainerCertificates;
