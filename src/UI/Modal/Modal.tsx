import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface Props extends React.PropsWithChildren {
  show: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<Props> = ({ show, onClose, title, children }) => {
  return (
    <Dialog
      open={show}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "500px",
          width: "90vw",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle variant="h5" textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
