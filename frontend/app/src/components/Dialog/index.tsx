import { FC, useState, useEffect, CSSProperties } from "react";
import "./styles.scss";

interface DialogProps {
  open: boolean;
  title: string;
  style?: CSSProperties;
}

export const Dialog: FC<DialogProps> = ({ open, title, style, children }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setOpenDialog(open);
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => setOpenDialog(open), 1000);
    }
  }, [open]);

  if (!openDialog) {
    return null;
  }

  return (
    <div className="dialog" style={style}>
      {openDialog && (
        <div className={`content ${open ? "in" : "out"}`}>
          <h1>{title}</h1>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

Dialog.defaultProps = {};

export default Dialog;
