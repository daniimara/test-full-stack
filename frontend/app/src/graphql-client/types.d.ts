interface User {
  id: string;
  name: string;
  dob?: string;
  address: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

type ExclusiveStartKey = {
  [key: string]: string;
};

interface LocationResponse {
  coordinates: number[];
}

interface UsersWithPaginationParams {
  items: User[];
  exclusiveStartKey?: ExclusiveStartKey;
}

interface UserInput {
  name: string;
  dob: string;
  address: string;
  description: string;
  imageUrl: string;
}

interface UpdateUserInput {
  id: string;
  name: string;
  dob?: string;
  address: string;
  description: string;
  imageUrl: string;
}

interface ListUsersInput {
  pageSize: number;
  exclusiveStartKey?: ExclusiveStartKey;
}

interface Query {
  listAllUsers: User[];
  listUsers: UsersWithPaginationParams;
  getUserById: User;
  getUserByName: User[];
}

interface Mutation {
  createUser: User;
  deleteUser: string;
  updateUser: User;
}
