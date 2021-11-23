// Providers
import axios, { AxiosResponse } from "axios";
// Models
import { TChannel } from "@models/types/channel/channel";
import { TChannelDto } from "@models/types/channel/channel.dto";
import { TUser } from "@models/types/user/user";
// Utils
import { handleErrorMessage } from "@utils/handleErrorMessage";
import { TMessages } from "@models/types/message/message";

type CreateMessage = {
  message: string;
};

export const getAll = async (baseURL: string, token: string) => {
  try {
    const response: AxiosResponse = await axios.get(`${baseURL}/channel/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const channels: TChannel[] = response.data;
    return channels;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getOneByQuery = async (
  baseURL: string,
  token: string,
  searchKey: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/channel/get?nameSearchKey=${searchKey}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const channel: TChannel = response.data;
    return channel;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};

export const create = async (
  baseURL: string,
  token: string,
  payload: TChannelDto
) => {
  try {
    const response: AxiosResponse = await axios(`${baseURL}/channel/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    const createChannel: CreateMessage = response.data;
    return createChannel.message;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};

export const assignUserToChannel = async (
  baseURL: string,
  token: string,
  nameSearchKey: string
) => {
  try {
    const responseUser: AxiosResponse = await axios(`${baseURL}/user/get`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const user: TUser = responseUser.data;
    const responseChannel: AxiosResponse = await axios(
      `${baseURL}/channel/update/chat/${user._id}?nameSearchKey=${nameSearchKey}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const channel: TChannel = responseChannel.data;
    const responseMessages: AxiosResponse = await axios(
      `${baseURL}/message/channel/${channel._id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const messagesByChannel: TMessages[] = responseMessages.data;
    return {
      channel,
      messagesByChannel,
    };
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};
