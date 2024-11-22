import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)<{
  textColor: string;
  backgroundColor: string;
  border: string;
}>(({ textColor, backgroundColor, border }) => ({
  backgroundColor: backgroundColor,
  color: textColor,
  fontSize: "12px",
  fontWeight: 700,
  padding: "12px 45px",
  display: "inline-block",
  textAlign: "center",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textTransform: "none",
  border: border,
  textDecoration: "none",
}));

interface Props {
  text: string;
  color: string;
  backgroundColor: string;
  border: string;
}

const TryFreeButton: React.FC<Props> = ({
  text,
  color,
  backgroundColor,
  border,
}) => {
  return (
    <StyledButton
      textColor={color}
      backgroundColor={backgroundColor}
      border={border}
    >
      {text}
    </StyledButton>
  );
};

export default TryFreeButton;
