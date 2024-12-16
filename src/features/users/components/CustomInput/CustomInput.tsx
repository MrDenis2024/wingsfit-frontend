import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const CustomInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      slotProps={{
        inputLabel: {
          sx: {
            position: "absolute",
            top: "7px",
            left: "0px",
            "&.Mui-focused": {
              color: "#333",
            },
          },
        },
      }}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "&.Mui-focused": {
            boxShadow: "0 0 8px rgba(0, 123, 255, 0.3)",
          },
        },
        "& .MuiInputLabel-root": {
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default CustomInput;
