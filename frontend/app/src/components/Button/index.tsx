import React, { FC } from "react";
import "./styles.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  type?: "button" | "submit";
  id?: string;
  name?: string;
  variant?: "primary" | "secondary";
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  variant,
  value,
  onClick,
  ...rest
}) => {
  return (
    <div className={`${variant}-button`}>
      <button onClick={onClick} {...rest}>
        {value}
      </button>
    </div>
  );
};

Button.defaultProps = {
  type: "button",
  variant: "primary",
};

export default Button;
