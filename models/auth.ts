import { api_key, base_url } from "../config/config.json";
import Auth from "../interfaces/Auth";

import storage from "./storage";

const auth = {
  loggedIn: async () => {
    const token = await storage.readToken();
    const twentyFourHours = 1000 * 60 * 60 * 24;
    const notExpired = new Date().getTime() - token.date < twentyFourHours;

    return token && notExpired;
  },
  // TODO: change email/password to auth interface object
  login: async (email: string, password: string) => {
    const data = {
      api_key,
      email,
      password,
    };
    // TODO: Destructure token and message
    const result = await (
      await fetch(`${base_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      })
    ).json();

    await storage.storeToken(result.data.token);

    return result.data.message;
  },
  // TODO: change email/password to auth interface object
  register: async (email: string, password: string) => {
    const data = {
      api_key,
      email,
      password,
    };
    const result = await (
      await fetch(`${base_url}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      })
    ).json();

    return result;
  },
  logout: async () => {
    await storage.deleteToken();
  },
};

export default auth;
