// Providers
import axios, { AxiosResponse } from "axios";
// Utils
import { handleErrorMessage } from "@utils/handleErrorMessage";
// Models
import { TUser } from "@models/types/user/user";
import { TUserDto } from "@models/types/user/user.dto";

type Message = {
  message: string;
};

export const create = async (baseURL: string, payload: TUserDto) => {
  try {
    const response: AxiosResponse = await axios(`${baseURL}/user/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      data: payload,
    });
    const createUser: Message = response.data;
    return createUser.message;
  } catch (error: any) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getOne = async (baseURL: string, token: string) => {
  try {
    const response: AxiosResponse = await axios(`${baseURL}/user/get`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const user: TUser = response.data;
    return user;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};

export const update = async (
  baseURL: string,
  token: string,
  payload: TUserDto
) => {
  try {
    const response: AxiosResponse = await axios(`${baseURL}/user/update`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    const userUpdated: Message = response.data;
    return userUpdated;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};
