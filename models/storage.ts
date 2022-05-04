import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  storeToken: async (token: string) => {
    try {
      const tokenAndDate = {
        token,
        date: new Date().getTime(),
      };

      const tokenStringified = JSON.stringify(tokenAndDate);

      await AsyncStorage.setItem("@token", tokenStringified);
    } catch (error) {
      console.error("failed to save token", error);
    }
  },
  readToken: async (): Promise<any> => {
    try {
      const tokenStringified = await AsyncStorage.getItem("@token");
      return tokenStringified != null ? JSON.parse(tokenStringified) : null;
    } catch (error) {
      console.error("failed to retrieve token", error);
    }
  },
  deleteToken: async () => {
    await AsyncStorage.removeItem("@token");
  },
};

export default storage;
