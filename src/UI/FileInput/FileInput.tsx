import React, { useRef, useState } from "react";
import { Button, OutlinedInput } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PermMediaIcon from "@mui/icons-material/PermMedia";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const [filename, setFilename] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    onChange(e);
  };

  return (
    <>
      <input
        type="file"
        name={name}
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onFileChange}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid size={6}>
          <OutlinedInput
            fullWidth
            placeholder={label}
            value={filename}
            onClick={activateInput}
          />
        </Grid>
        <Grid size={3}>
          <Button variant="outlined" color="inherit" onClick={activateInput}>
            <PermMediaIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
