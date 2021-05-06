import { FC, useState, ImgHTMLAttributes } from "react";
import "./styles.scss";
import spinner from "icons/spinner.svg";

export interface RHSpinnerProps extends ImgHTMLAttributes<HTMLImageElement> {
  color?: "black" | "white";
}

const Spinner: FC<RHSpinnerProps> = ({ color = "black", style, ...rest }) => {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  return (
    <img
      className="spinner"
      alt="Loading"
      src={spinner}
      style={{
        ...style,
      }}
      onError={() => setError(true)}
      {...rest}
    />
  );
};

Spinner.defaultProps = {};

export default Spinner;
