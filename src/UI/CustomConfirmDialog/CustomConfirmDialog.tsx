import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from "@mui/material";

interface CustomConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonStyle?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;
  transitionDuration?: number;
}

const CustomConfirmDialog: React.FC<CustomConfirmDialogProps> = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmButtonStyle,
  cancelButtonStyle,
  transitionDuration = 300,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="custom-confirm-dialog-title"
      aria-describedby="custom-confirm-dialog-description"
      TransitionProps={{
        timeout: transitionDuration,
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="custom-confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {description && (
          <Typography id="custom-confirm-dialog-description">
            {description}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          style={{
            color: theme.palette.error.main,
            ...cancelButtonStyle,
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            color: theme.palette.primary.main,
            ...confirmButtonStyle,
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmDialog;
