import { FC, useState, useEffect } from "react";
import "./styles.scss";
import Dialog from "components/Dialog";
import TextField from "components/TextField";
import Button from "components/Button";
import Map from "components/Map";
import Snackbar, { SnackbarProps } from "components/Snackbar";

import actionMessages from "resources/messages-actions.json";
import serviceMessages from "resources/messages-services.json";
import userMessages from "resources/messages-user.json";
import useLocation from "hooks/useLocation";

export interface UserEditProps {
  open: boolean;
  id?: string;
  name?: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  onSubmit: (user: User) => void;
  onClose: () => void;
}

export const UserEdit: FC<UserEditProps> = ({
  open,
  id,
  name,
  address,
  description,
  imageUrl,
  onSubmit,
  onClose,
}) => {
  const { getLocation } = useLocation();

  const [user, setUser] = useState<User>({
    id: id ?? "",
    name: name ?? "",
    address: address ?? "",
    description: description ?? "",
    imageUrl: imageUrl ?? "",
  });

  const validation: { [key: string]: boolean } = {};
  Object.keys(user).forEach((key: string) => {
    // TODO - Add a new input field to upload imageUrl and remove imageUrl exception
    if (key !== "id" && key !== "imageUrl") {
      validation[key] = Boolean(user[key as keyof User]);
    }
  });
  const isFormValid = Object.values(validation).every(Boolean);

  const [lng, setLng] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);

  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    open: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    if (open) {
      handleUpdateMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleUpdateMap = async () => {
    try {
      if (!!user.address) {
        const response: LocationResponse = await getLocation(user.address);
        if (response?.coordinates?.length > 1) {
          setLng(response.coordinates[0]);
          setLat(response.coordinates[1]);
        }
      }
    } catch (error) {
      setSnackbar({
        open: true,
        type: "error",
        message: serviceMessages.locationNotFound,
      });
    }
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      title={id ? userMessages.editUserTitle : userMessages.createUserTitle}
    >
      <div className="edit-user" data-testid="user-form">
        <Map lng={lng} lat={lat} />
        <div className="fields">
          <TextField
            data-testid="name"
            label={userMessages.name}
            name="name"
            value={user.name}
            rules={{
              required: `${userMessages.name} ${userMessages.isRequired}`,
            }}
            onChange={handleFieldChange}
          />
          <TextField
            data-testid="address"
            label={userMessages.address}
            name="address"
            value={user.address}
            rules={{
              required: `${userMessages.address} ${userMessages.isRequired}`,
            }}
            onChange={handleFieldChange}
            onBlur={handleUpdateMap}
          />
          <TextField
            data-testid="description"
            label={userMessages.description}
            name="description"
            value={user.description}
            rules={{
              required: `${userMessages.description} ${userMessages.isRequired}`,
            }}
            onChange={handleFieldChange}
          />
          <div className="actions">
            <Button
              data-testid="btn-submit"
              value={actionMessages.save}
              disabled={!isFormValid}
              onClick={() => onSubmit(user)}
            />
            <Button value={actionMessages.cancel} onClick={onClose} />
          </div>
        </div>
      </div>
      <Snackbar
        type={snackbar.type}
        open={snackbar.open}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        {snackbar.message}
      </Snackbar>
    </Dialog>
  );
};

UserEdit.defaultProps = {};

export default UserEdit;
