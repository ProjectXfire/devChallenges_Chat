import React, { useState } from "react";
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

  //******** RENDER ********/
  return (
    <SChatMessage>
      <input
        type="text"
        placeholder="Type a message here"
        onChange={(e) => handleMessage(e)}
        value={message}
      />
      <button
        type="button"
        onClick={() => {
          getMessage(message);
          setMessage("");
        }}
      >
        <IoMdSend size="20" color={colors.white} />
      </button>
    </SChatMessage>
  );
};
