import axios from "axios";
import faker from "faker";
import { render, fireEvent, act } from "@testing-library/react";

import UserEdit, { UserEditProps } from ".";

jest.mock("axios");
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

const renderUserForm = (props: Partial<UserEditProps> = {}) => {
  const defaultProps: UserEditProps = {
    onClose() {
      return;
    },
    onSubmit(user: User) {
      return user;
    },
    open: true,
    id: props.id,
    name: props.name,
    address: props.address,
    description: props.description,
    imageUrl: props.imageUrl,
  };
  return render(<UserEdit {...defaultProps} {...props} />);
};

describe("<UserEdit />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be created", () => {
    const instance = renderUserForm({ open: false });
    expect(instance).toBeTruthy();
  });

  it("should be created for edit mode", () => {
    const { getByText } = renderUserForm({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      address: `${faker.address.city()}, ${faker.address.country()}`,
      description: faker.lorem.word(10),
      imageUrl: faker.image.imageUrl(),
    });
    const title = getByText("Edit User");
    expect(title).toBeTruthy();
  });

  it("should show error message for the required fields", async () => {
    const { findByTestId } = renderUserForm({ name: faker.name.firstName() });

    const name = await findByTestId("name");

    fireEvent.change(name, { target: { value: "" } });
    fireEvent.blur(name);

    const errorMessage = await findByTestId("error-message");

    expect(errorMessage).toBeTruthy();
  });

  it('should have the "Save" button disabled initially', async () => {
    const { findByTestId } = renderUserForm();
    const button = await findByTestId("btn-submit");
    expect(button.closest("button")?.disabled).toBe(true);
  });

  it('should enable the "Save" button when all fields are filled', async () => {
    const { findByTestId } = renderUserForm();

    const submit = await findByTestId("btn-submit");
    const name = await findByTestId("name");
    const address = await findByTestId("address");
    const description = await findByTestId("description");

    fireEvent.change(name, { target: { value: faker.name.firstName() } });
    fireEvent.change(address, {
      target: { value: `${faker.address.city()}, ${faker.address.country()}` },
    });
    fireEvent.change(description, { target: { value: faker.lorem.word(10) } });

    expect(submit.closest("button")?.disabled).toBe(false);
  });

  it("should submit the form with name, address, and description", async () => {
    const user: User = {
      id: "",
      name: faker.name.firstName(),
      address: `${faker.address.city()}, ${faker.address.country()}`,
      description: faker.lorem.word(10),
      imageUrl: "",
    };

    const onSubmit = jest.fn();
    const { findByTestId } = renderUserForm({
      onSubmit,
    });
    const name = await findByTestId("name");
    const address = await findByTestId("address");
    const description = await findByTestId("description");
    const submit = await findByTestId("btn-submit");

    fireEvent.change(name, { target: { value: user.name } });
    fireEvent.change(address, {
      target: { value: user.address },
    });
    fireEvent.change(description, { target: { value: user.description } });
    fireEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith(user);
  });

  it("should retrieve the location based on the address", async () => {
    const axiosMock = axios.get as jest.Mock;
    axiosMock.mockImplementationOnce(() => ({
      data: {
        coordinates: [faker.address.latitude(), faker.address.longitude()],
      },
    }));

    let instance;
    await act(async () => {
      instance = renderUserForm({
        address: `${faker.address.city()} ${faker.address.country()}`,
      });
    });

    expect(instance).toBeTruthy();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should retrieve the location based on the address when it changes", async () => {
    const axiosMock = axios.get as jest.Mock;
    axiosMock.mockImplementationOnce(() => ({
      data: {
        coordinates: [faker.address.latitude(), faker.address.longitude()],
      },
    }));

    const { findByTestId } = renderUserForm();

    const address = await findByTestId("address");

    await act(async () => {
      await fireEvent.change(address, {
        target: { value: `${faker.address.city()} ${faker.address.country()}` },
      });
      await fireEvent.blur(address);
    });

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should show snackbar if there is no location data on the response", async () => {
    const axiosMock = axios.get as jest.Mock;
    axiosMock.mockImplementationOnce(() => ({
      data: { coordinates: [] },
    }));

    const { findByTestId } = renderUserForm({
      address: `${faker.address.city()} ${faker.address.country()}`,
    });

    const snackbar = await findByTestId("snackbar");
    const closeButton = await findByTestId("snackbar-btn-close");

    fireEvent.click(closeButton);

    expect(snackbar).toBeTruthy();
    expect(closeButton).toBeTruthy();
  });

  it("should show snackbar if occurs error when retrieving the location data", async () => {
    const axiosMock = axios.get as jest.Mock;
    axiosMock.mockImplementationOnce(() => Promise.reject(new Error("Error")));

    const { findByTestId } = renderUserForm({
      address: `${faker.address.city()} ${faker.address.country()}`,
    });

    const snackbar = await findByTestId("snackbar");
    const closeButton = await findByTestId("snackbar-btn-close");

    fireEvent.click(closeButton);

    expect(snackbar).toBeTruthy();
    expect(closeButton).toBeTruthy();
  });
});
