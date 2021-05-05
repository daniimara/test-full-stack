import { FC, useState, CSSProperties } from "react";
import "./styles.scss";
import edit from "icons/edit.svg";
import remove from "icons/remove.svg";
import moment from "moment";
import Avatar from "component-avatar";

import userMessages from "resources/messages-user.json";

interface CardProps {
  imageUrl: string;
  title: string;
  createdAt?: string;
  description: string;
  style?: CSSProperties;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Card: FC<CardProps> = ({
  imageUrl,
  title,
  createdAt,
  description,
  style,
  onEdit,
  onDelete,
}) => {
  const [showIcons, setShowIcons] = useState<boolean>(false);

  const handleEnableIcons = () => {
    if (!showIcons) {
      setShowIcons(true);
    }
  };

  const handleDisableIcons = () => {
    if (showIcons) {
      setTimeout(() => setShowIcons(false), 1000);
    }
  };

  return (
    <div
      className="user-card"
      style={style}
      onMouseMove={handleEnableIcons}
      onMouseEnter={handleEnableIcons}
      onMouseLeave={handleDisableIcons}
    >
      <div className="user-content">
        <div className="user-actions">
          {showIcons && onEdit && onDelete && (
            <>
              <span className="user-icon" onClick={onDelete}>
                <img alt={userMessages.delete} src={remove} />
              </span>
              <span className="user-icon" onClick={onEdit}>
                <img alt={userMessages.edit} src={edit} />
              </span>
            </>
          )}
        </div>
        <div className="user-avatar">
          <Avatar src={imageUrl} />
        </div>
        <div className="user-title">
          <h2>{title}</h2>
          {createdAt && (
            <p className="user-created-at">
              <span>{userMessages.created}</span>
              <span className="user-created-at-date">{` ${moment(
                createdAt
              ).format("DD MMM YYYY")}`}</span>
            </p>
          )}
        </div>
        <p className="user-description">{description}</p>
      </div>
    </div>
  );
};

Card.defaultProps = {};

export default Card;
