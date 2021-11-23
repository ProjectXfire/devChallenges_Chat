import React from "react";
import Image from "next/image";
// Styles
import { SChatList } from "@styles/components/chat";

type ChatMemberProps = {
  name: string;
  photo: string | StaticImageData;
};

export const ChatList = ({ name, photo }: ChatMemberProps) => {
  return (
    <SChatList>
      <Image src={photo} width={35} height={35} alt="user-photo" />
      <p>{name.toUpperCase()}</p>
    </SChatList>
  );
};
