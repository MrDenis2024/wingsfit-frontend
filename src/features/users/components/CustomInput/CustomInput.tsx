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
            "@media (max-width: 350px)": {
              top: "5px",
              left: "0px",
            },
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
          fontSize: "0.9rem",
        },
        "& .MuiOutlinedInput-input": {
          "@media (max-width: 350px)": {
            padding: "20px 10px 10px 10px",
          },
        },
        "& .MuiInputLabel-root": {
          fontWeight: "bold",
          "@media (max-width: 350px)": {
            fontSize: "0.75rem",
          },
        },
      }}
    />
  );
};

export default CustomInput;
