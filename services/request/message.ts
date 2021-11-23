// Providers
import axios, { AxiosResponse } from "axios";
// Types
import { TMessageDto } from "@models/types/message/message.dto";
import { TMessages } from "@models/types/message/message";
// Utils
import { handleErrorMessage } from "@utils/handleErrorMessage";

type Message = {
  message: string;
};

export const createMessage = async (
  baseURL: string,
  token: string,
  payload: TMessageDto
) => {
  try {
    const response: AxiosResponse = await axios(`${baseURL}/message/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
    const createMessage: Message = response.data;
    return createMessage;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};

export const getAllMessagesByChannel = async (
  baseURL: string,
  token: string,
  channelId: string
) => {
  try {
    const response: AxiosResponse = await axios(
      `${baseURL}/message/channel/${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const messages: TMessages[] = response.data;
    return messages;
  } catch (error) {
    throw new Error(handleErrorMessage(error));
  }
};
