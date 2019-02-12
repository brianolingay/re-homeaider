import * as localforage from "localforage";

const tokenKey = "token";
const refreshTokenKey = "refreshToken";

export interface Tokens {
  token: string;
  refreshToken: string;
}

const setDrive = async () => {
  await localforage.setDriver([
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE,
  ]);
};

export const authTokenStore = {
  async getTokens(): Promise<Tokens> {
    await setDrive();
    const token = (await localforage.getItem(tokenKey)) as any;
    const refreshToken = (await localforage.getItem(refreshTokenKey)) as any;

    return { token, refreshToken };
  },

  async setTokens(token, refreshToken): Promise<void> {
    await setDrive();
    await localforage.setItem(tokenKey, token);
    await localforage.setItem(refreshTokenKey, refreshToken);
  },

  async removeTokens() {
    await setDrive();
    await localforage.removeItem(tokenKey);
  },
};
