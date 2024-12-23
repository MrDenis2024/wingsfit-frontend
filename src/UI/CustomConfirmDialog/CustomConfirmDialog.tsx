import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      <DialogTitle
        id="custom-confirm-dialog-title"
        sx={{
          fontSize: isSmallScreen ? "18px" : "24px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        {description && (
          <Typography
            id="custom-confirm-dialog-description"
            sx={{
              fontSize: isSmallScreen ? "12px" : "16px",
            }}
          >
            {description}
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <Button
          onClick={onCancel}
          style={{
            color: theme.palette.error.main,
            ...cancelButtonStyle,
            fontSize: isSmallScreen ? "12px" : "14px",
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          style={{
            color: theme.palette.primary.main,
            ...confirmButtonStyle,
            fontSize: isSmallScreen ? "12px" : "14px",
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmDialog;
