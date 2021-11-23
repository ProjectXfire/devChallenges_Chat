import React from "react";
import Image from "next/image";
// Styles
import { SChatList } from "@styles/components/chat";

type ChatMemberProps = {
  name: string;
  nameSearchKey?: string;
  assingToChannel?: (value: string) => void;
};

export const ChatChanneltList = ({
  name,
  assingToChannel = () => {},
  nameSearchKey = "",
}: ChatMemberProps) => {
  return (
    <SChatList onClick={() => assingToChannel(nameSearchKey)}>
      <span>
        {name
          .split(/\s/)
          .reduce((response, word) => (response += word.slice(0, 1)), "")
          .toUpperCase()}
      </span>
      <p>{name.toUpperCase()}</p>
    </SChatList>
  );
};
