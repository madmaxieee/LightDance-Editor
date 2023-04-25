import { isAxiosError } from "axios";

import instance from "./axios";
import { notification } from "../core/utils";

export const authAgent = {
  login: async (username: string, password: string) => {
    try {
      const res = await instance.post("/login", { username, password });
      notification.success("Login success");
      return {
        token: res.data.token,
        success: true,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        notification.error(error.response?.data?.err);
      }

      return {
        success: false,
      };
    }
  },
  logout: async () => {
    try {
      await instance.post("/logout");

      return {
        success: true,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        notification.error(error.response?.data?.err);
      }

      return {
        success: false,
      };
    }
  },
  // check token in cookie
  checkToken: async () => {
    try {
      if (import.meta.env.VITE_DEMO_MODE === "true") {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) document.cookie = `token=${token}`;
      }

      const res = await instance.get("/checkToken");

      return {
        token: res.data.token,
        success: res.status === 200,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  },
};
