import { FC, useState } from "react";
import "./styles.scss";

interface TextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  id?: string;
  type?: "email" | "password" | "text";
  label?: string;
  rules?: { [key: string]: string };
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const TextField: FC<TextFieldProps> = ({
  name,
  value,
  label,
  rules = {},
  onChange,
  onBlur,
  ...rest
}) => {
  const [showErrorMessage, setErrorMessage] = useState<string>();

  const handleBlurValidate = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!value && rules["required"]) {
      setErrorMessage(rules["required"]);
    }
    onBlur?.(event);
  };

  return (
    <div className="text-field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlurValidate}
        {...rest}
      />
      {showErrorMessage && (
        <span data-testid="error-message" className="text-field-error">
          {showErrorMessage}
        </span>
      )}
    </div>
  );
};

TextField.defaultProps = {
  type: "text",
  value: "",
};

export default TextField;
