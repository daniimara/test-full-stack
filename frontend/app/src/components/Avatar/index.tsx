import { FC, CSSProperties } from "react";
import "./styles.scss";

interface AvatarProps {
  src: string;
  alt?: string;
  id?: string;
  style?: CSSProperties;
}

export const Avatar: FC<AvatarProps> = ({ alt = "Avatar", ...rest }) => {
  return (
    <div className="avatar">
      <img alt={alt} {...rest} />
    </div>
  );
};

Avatar.defaultProps = {};

export default Avatar;
