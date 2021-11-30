import { TUser } from "../user/user";

export type TMessages = {
  _id: string;
  message: string;
  messageImg: string;
  audio: string;
  user: TUser;
};
