import faker from "faker";
import createUser from "./createUser";

import { INTERNAL_ERROR_RESPONSE_MESSAGE } from "../resources/messages-response.json";

jest.mock("aws-sdk", () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      put: jest
        .fn()
        .mockImplementation(() => ({ promise: () => Promise.resolve({}) })),
    })),
  },
}));

describe("createUser method", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Returns user after it has being saved", async () => {
    const user: User = {
      name: `${faker.name.findName()} ${faker.name.lastName()}`,
      dob: faker.date.past().toString(),
      address: `${faker.address.city()}, ${faker.address.country()}`,
      description: faker.lorem.words(10),
      imageUrl: faker.image.imageUrl(),
    };

    const response = await createUser(user);

    Object.keys(user).forEach((key: string) => {
      expect(response[key as keyof User]).toEqual(user[key as keyof User]);
    });
  });

  it("Returns error response for unhandled errors", async () => {
    const user: User = {
      name: `${faker.name.findName()} ${faker.name.lastName()}`,
      dob: faker.date.past().toString(),
      address: `${faker.address.city()}, ${faker.address.country()}`,
      description: faker.lorem.words(10),
      imageUrl: faker.image.imageUrl(),
    };

    jest.mock("aws-sdk", () => ({
      DynamoDB: {
        DocumentClient: jest.fn(() => ({
          put: jest.fn().mockImplementation(() => ({
            promise: () => {
              throw new Error();
            },
          })),
        })),
      },
    }));

    try {
      const response = await createUser(user);
    } catch (e) {
      expect(e.message).toContain(INTERNAL_ERROR_RESPONSE_MESSAGE);
    }
  });
});
