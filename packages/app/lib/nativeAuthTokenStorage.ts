import { AsyncStorage } from "react-native";

export interface NativeTokens {
  token: string | null;
  refreshToken: string | null;
}

export const nativeAuthTokenStorage = {
  async getTokens() {
    const token = await AsyncStorage.getItem("token");
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    return { token, refreshToken };
  },

  async setTokens({ token, refreshToken }: NativeTokens) {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  },

  async removeTokens() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");
  },
};
