import createUser from "./createUser";
import listAllUsers from "./listAllUsers";
import getUserById from "./getUserById";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    user: User;
    userId: string;
  };
};

export async function handler(
  event: AppSyncEvent
): Promise<User[] | User | string | null> {
  switch (event.info.fieldName) {
    case "listAllUsers":
      return await listAllUsers();
    case "createUser":
      return await createUser(event.arguments.user);
    case "updateUser":
      return await updateUser(event.arguments.user);
    case "getUserById":
      return await getUserById(event.arguments.userId);
    case "deleteUser":
      return await deleteUser(event.arguments.userId);
    default:
      return null;
  }
}
