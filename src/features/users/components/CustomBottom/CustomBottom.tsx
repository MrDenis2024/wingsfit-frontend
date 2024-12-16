import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "16px",
        textTransform: "none",
        ...(props.variant === "outlined"
          ? {
              color: "#44a9ca",
              borderColor: "#44a9ca",
              "&.Mui-disabled": {
                borderColor: "#d6d8db",
                color: "#d6d8db",
              },
              "&:hover": {
                borderColor: "#6c757d",
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }
          : {
              backgroundColor: "#44a9ca",
              color: "white",
              "&.Mui-disabled": {
                backgroundColor: "#d6d8db",
                color: "#6c757d",
              },
              "&:hover": {
                backgroundColor: "#369ea5",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              },
            }),
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
