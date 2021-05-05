import { AppEnv } from "utils/AppEnv";
import { getGlobal } from "utils/getGlobal";

export const useEnv = (): AppEnv => getGlobal("_env");
