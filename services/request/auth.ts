// Providers
import axios, { AxiosResponse } from "axios";
// Types
import { TToken } from "@models/types/auth/token";
// Utils
import { handleErrorMessage } from "@utils/handleErrorMessage";

export const login = async (
  baseURL: string,
  email: string,
  password: string
) => {
  try {
    const response: AxiosResponse = await axios(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    const token: TToken = response.data;
    return token.access_token;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};
