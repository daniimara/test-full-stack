import faker from "faker";
import listAllUsers from "./listAllUsers";

import { INTERNAL_ERROR_RESPONSE_MESSAGE } from "../resources/messages-response.json";

jest.mock("aws-sdk", () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      scan: jest.fn().mockImplementation(() => ({
        promise: () =>
          Promise.resolve({
            Items: [
              {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                dob: faker.date.past().toString(),
                address: `${faker.address.city()}, ${faker.address.country()}`,
                description: faker.lorem.words(10),
              },
            ],
          }),
      })),
    })),
  },
}));

describe("listAllUsers method", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Returns user list", async () => {
    const response = await listAllUsers();

    expect(response.length).toBe(1);
  });

  it("Returns error response for unhandled errors", async () => {
    jest.mock("aws-sdk", () => ({
      DynamoDB: {
        DocumentClient: jest.fn(() => ({
          scan: jest.fn().mockImplementation(() => ({
            promise: () => {
              throw new Error();
            },
          })),
        })),
      },
    }));

    try {
      const response = await listAllUsers();
    } catch (e) {
      expect(e.message).toContain(INTERNAL_ERROR_RESPONSE_MESSAGE);
    }
  });
});
