import axios from "axios";
import faker from "faker";
import { handler } from "./getLocation";
import { APIGatewayProxyEvent } from "aws-lambda";

import {
  ENTITY_NOT_FOUND_ERROR_RESPONSE_MESSAGE,
  QUERY_NOT_FOUND_ERROR_RESPONSE_MESSAGE,
} from "../resources/messages-response.json";

jest.mock("axios");

describe("location method", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Returns location coordinates", async () => {
    const address = faker.address;
    const axiosMock = axios.get as jest.Mock;
    axiosMock.mockImplementationOnce(() => ({
      data: {
        features: [{ center: [address.latitude, address.longitude] }],
      },
    }));

    const query = `${address.city}, ${address.country}`;
    const URL = `${process.env.MAP_BOX_URL}/${query}.json`;
    const params = {
      params: {
        access_token: process.env.MAP_BOX_ACCESS_TOKEN,
      },
    };

    const event = ({
      pathParameters: {
        query,
      },
      body: "",
      headers: {},
    } as unknown) as APIGatewayProxyEvent;

    const response = (await handler(event)) as LocationResponse;

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(URL, params);
    expect(response.coordinates.length).toEqual(2);
  });

  it("Returns error response when there is no data", async () => {
    const address = faker.address;
    const axiosMock = axios.get as jest.Mock;
    axiosMock.mockImplementationOnce(() => ({
      data: {},
    }));

    const query = `${address.city}, ${address.country}`;

    const event = ({
      pathParameters: {
        query,
      },
      body: "",
      headers: {},
    } as unknown) as APIGatewayProxyEvent;

    try {
      const response = (await handler(event)) as LocationResponse;
    } catch (e) {
      expect(e.message).toContain(ENTITY_NOT_FOUND_ERROR_RESPONSE_MESSAGE);
    }
  });

  it("Returns error response when there is no coordinates data", async () => {
    const address = faker.address;
    const axiosMock = axios.get as jest.Mock;
    axiosMock.mockImplementationOnce(() => ({
      data: {
        features: [],
      },
    }));

    const query = `${address.city}, ${address.country}`;

    const event = ({
      pathParameters: {
        query,
      },
      body: "",
      headers: {},
    } as unknown) as APIGatewayProxyEvent;

    try {
      const response = (await handler(event)) as LocationResponse;
    } catch (e) {
      expect(e.message).toContain(ENTITY_NOT_FOUND_ERROR_RESPONSE_MESSAGE);
    }
  });

  it("Returns error response when the coordinates were not found", async () => {
    const address = faker.address;
    const query = `${address.city}, ${address.country}`;
    const event = ({
      pathParameters: {
        query,
      },
      body: "",
      headers: {},
    } as unknown) as APIGatewayProxyEvent;

    try {
      const response = (await handler(event)) as LocationResponse;
    } catch (e) {
      expect(e.message).toContain(ENTITY_NOT_FOUND_ERROR_RESPONSE_MESSAGE);
    }
  });

  it("Returns pathParameters not found", async () => {
    const event = ({
      pathParameters: {},
      body: "",
      headers: {},
    } as unknown) as APIGatewayProxyEvent;

    try {
      const response = (await handler(event)) as LocationResponse;
    } catch (e) {
      expect(e.message).toContain(QUERY_NOT_FOUND_ERROR_RESPONSE_MESSAGE);
    }
  });
});
