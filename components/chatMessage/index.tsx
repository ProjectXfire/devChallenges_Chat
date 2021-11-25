import React, { FormEvent, useState } from "react";
// Providers
import { IoMdSend } from "react-icons/io";
// Styles
import { SChatMessage } from "@styles/components/chat";
import { colors } from "@styles/variables/colors";

type ChatMessageProps = {
  getMessage: (message: string) => void;
};

export const ChatMessage = ({ getMessage }: ChatMessageProps) => {
  //******** STATES ********/
  const [message, setMessage] = useState("");

  //******** METHODS ********/
  function handleMessage(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getMessage(message);
    setMessage("");
  }

  //******** RENDER ********/
  return (
    <SChatMessage>
      <form onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          placeholder="Type a message here"
          onChange={(e) => handleMessage(e)}
          value={message}
        />
        <button type="submit">
          <IoMdSend size="20" color={colors.white} />
        </button>
      </form>
    </SChatMessage>
  );
};
