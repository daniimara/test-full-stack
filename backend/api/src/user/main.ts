import createUser from "./createUser";
import listAllUsers from "./listAllUsers";
import getUserById from "./getUserById";

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
): Promise<User[] | User | null> {
  switch (event.info.fieldName) {
    case "listAllUsers":
      return await listAllUsers();
    case "createUser":
      return await createUser(event.arguments.user);
    case "getUserById":
      return await getUserById(event.arguments.userId);
    default:
      return null;
  }
}
