import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0cc5d6",
  color: "#fff",
  border: "3px solid #0cc5d6",
  borderRadius: "7px",
  fontSize: "12px",
  fontWeight: 700,
  width: "170px",
  padding: "10px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textTransform: "none",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#fff",
    boxShadow: theme.shadows[2],
    transform: "scale(1.03)",
    color: "#0cc5d6",
    fontSize: "13px",
  },
}));

interface Props {
  text: string;
}

const BeRoleButton: React.FC<Props> = ({ text }) => {
  return <StyledButton variant="outlined">{text}</StyledButton>;
};

export default BeRoleButton;
