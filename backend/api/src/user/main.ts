import createUser from "./createUser";
import listAllUsers from "./listAllUsers";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    user: User;
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
    default:
      return null;
  }
}
