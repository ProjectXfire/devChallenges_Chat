import { TUser } from "../user/user";

export type TChannel = {
  _id: string;
  description: string;
  name: string;
  nameSearchKey: string;
  users?: TUser[];
};
