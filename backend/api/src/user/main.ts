import createUser from "./createUser";
import listAllUsers from "./listAllUsers";
import listUsers from "./listUsers";
import getUserById from "./getUserById";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";
import getUserByName from "./getUserByName";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    user: User;
    userId: string;
    userName: string;
    input: ListUsersInput;
  };
};

export async function handler(
  event: AppSyncEvent
): Promise<User[] | UsersWithPaginationParams | User | string | null> {
  switch (event.info.fieldName) {
    case "listAllUsers":
      return await listAllUsers();
    case "listUsers":
      return await listUsers(event.arguments.input);
    case "createUser":
      return await createUser(event.arguments.user);
    case "updateUser":
      return await updateUser(event.arguments.user);
    case "getUserById":
      return await getUserById(event.arguments.userId);
    case "getUserByName":
      return await getUserByName(event.arguments.userName);
    case "deleteUser":
      return await deleteUser(event.arguments.userId);
    default:
      return null;
  }
}
