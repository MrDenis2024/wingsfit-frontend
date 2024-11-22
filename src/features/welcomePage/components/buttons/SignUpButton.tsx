import React from "react";
import {Button, styled} from "@mui/material";

const StyledButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  color: "#000000",
  fontSize: "10px",
  fontWeight: 700,
  padding: "5px 8px",
  display: "inline-block",
  textAlign: "center",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textTransform: "none",
  border: "2px solid #ff5136",
  textDecoration: "none",
  borderRadius: "5px",
}));

interface Props {
  text: string;
}

const SignUpButton: React.FC<Props> = ({text}) => {
  return (
    <StyledButton>{text}</StyledButton>
  );
};

export default SignUpButton;