import { AppEnv } from "./AppEnv";

export type CustomGlobals = AppEnv;

export type CustomGlobalKeys = keyof AppEnv;

export interface GlobalGetters {
  _env: Function;
}

export interface CachedGlobals {
  _env?: AppEnv;
}

export const globalGetters: GlobalGetters = {
  _env: (): AppEnv => {
    return process.env as NodeJS.ProcessEnv & AppEnv;
  },
};

export const cachedGlobals: CachedGlobals = {};

export const getGlobal = (name: keyof GlobalGetters): CustomGlobals => {
  return typeof cachedGlobals[name] === "undefined"
    ? (cachedGlobals[name] = globalGetters[name]())
    : cachedGlobals[name];
};
