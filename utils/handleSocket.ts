import { TMessages } from "@models/types/message/message";
import io from "socket.io-client";
let socket: any;

type Message = {
  channel: string;
  message: string;
  user: string;
};

// Init socket
export const initiateSocket = (baseURL: string, channel: string) => {
  console.log("Connecting socket...");
  socket = io(baseURL, { transports: ["websocket"] });
  socket.emit("channel", channel);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb: any) => {
  if (!socket) return true;
  socket.on("userMessage", (userMessages: TMessages[]) => {
    console.log("Websocket event received!");
    return cb(null, userMessages);
  });
};

export const sendMessage = (userMessage: Message) => {
  if (socket) socket.emit("userMessage", userMessage);
};
