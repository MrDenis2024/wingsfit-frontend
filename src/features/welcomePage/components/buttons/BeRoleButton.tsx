import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0cc5d6",
  color: "#000000",
  borderRadius: "10px",
  fontSize: "12px",
  fontWeight: 700,
  padding: "10px 60px",
  display: "inline-block",
  textAlign: "center",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textTransform: "none",
  border: "0 none",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#00acc1",
    boxShadow: theme.shadows[2],
    transform: "scale(1.03)",
    color: "#ffffff",
  },
}));

interface Props {
  text: string;
}

const BeRoleButton: React.FC<Props> = ({ text }) => {
  return <StyledButton variant="outlined">{text}</StyledButton>;
};

export default BeRoleButton;
