import { FC, useEffect } from "react";
import "./styles.scss";

// export type SnackbarProps = Omit<SnackbarComponentProps, "open" | "onClose">;

export type SnackbarType = "info" | "success" | "warning" | "error";

export interface SnackbarProps {
  open: boolean;
  type: SnackbarType;
  message: string;
}

export interface SnackbarComponentProps {
  type: SnackbarType;
  open: boolean;
  onClose: () => void;
}

export const Snackbar: FC<SnackbarComponentProps> = ({
  type,
  open,
  children,
  onClose,
}) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => onClose(), 5000);
    }
  }, [onClose, open]);

  return (
    <div
      data-testid="snackbar"
      className={`snackbar ${open && "visible"} ${type}`}
    >
      <span>{children}</span>
      <button
        data-testid="snackbar-btn-close"
        className="close"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
