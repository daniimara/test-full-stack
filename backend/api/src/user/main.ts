import createUser from "./createUser";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    user: User;
  };
};

export async function handler(event: AppSyncEvent): Promise<User | null> {
  switch (event.info.fieldName) {
    case "createUser":
      return await createUser(event.arguments.user);
    default:
      return null;
  }
}
