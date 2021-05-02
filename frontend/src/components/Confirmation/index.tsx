import { FC } from "react";
import "./styles.scss";
import Dialog from "component-dialog";

interface ConfirmationProps {
  open: boolean;
  title?: string;
  message?: string;
}

export const Confirmation: FC<ConfirmationProps> = ({
  open,
  title,
  message,
  children,
}) => {
  return (
    <Dialog open={open} title="Delete user">
      <div className="confirmation">
        {title && <h1>{title}</h1>}
        {message && <h2>{message}</h2>}
        <div>{children}</div>
      </div>
    </Dialog>
  );
};

Confirmation.defaultProps = {};

export default Confirmation;
