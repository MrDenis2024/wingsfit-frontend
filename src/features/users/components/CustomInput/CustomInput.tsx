import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const CustomInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      variant="standard"
      fullWidth
      sx={{
        mb: 2,
        "& .MuiInputBase-root": {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
          },
          "&:focus-within": {
            boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
          },
        },
        "& .MuiInputBase-input": {
          "&::placeholder": {
            fontSize: "14px",
            "@media (max-width: 350px)": {
              fontSize: "12px",
            },
          },
        },
        "& .MuiInputLabel-root": {
          "&.Mui-focused": {
            color: "white",
          },
        },
      }}
      slotProps={{
        input: {
          sx: {
            padding: "10px 12px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            "@media (max-width: 350px)": {
              padding: "8px 10px",
              fontSize: "14px",
            },
          },
        },
        inputLabel: {
          shrink: true,
          sx: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "10px",
          },
        },
      }}
    />
  );
};

export default CustomInput;
