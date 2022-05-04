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
  login: async (authFields: Auth) => {
    const data = {
      api_key,
      email: authFields.email,
      password: authFields.password,
    };
    const {
      data: { token, message },
    } = await (
      await fetch(`${base_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      })
    ).json();

    await storage.storeToken(token);

    return message;
  },
  register: async (authFields: Auth) => {
    const data = {
      api_key,
      email: authFields.email,
      password: authFields.password,
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
