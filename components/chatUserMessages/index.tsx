import React from "react";
import Image from "next/image";
// Types
import { TMessages } from "@models/types/message/message";
// Styles
import {
  SChatUserMessages,
  SChatUserAvatar,
  SChatUserMessage,
} from "@styles/components/messages";
import { MdInsertPhoto } from "react-icons/md";

type ChatUserMessages = {
  message: TMessages;
};

export const ChatUserMessages = ({ message }: ChatUserMessages) => {
  return (
    <SChatUserMessages>
      <SChatUserAvatar>
        {message.user && message.user.avatar ? (
          <Image
            src={message.user.avatar}
            width={40}
            height={40}
            alt="user-photo"
          />
        ) : (
          <MdInsertPhoto size={50} />
        )}
      </SChatUserAvatar>
      <SChatUserMessage>
        <div>
          <h4>{message.user?.username}</h4>
          {message.messageImg && (
            <Image
              src={message.messageImg}
              width={100}
              height={100}
              alt="message-img"
              objectFit="contain"
              quality={100}
            />
          )}
          <p>{message.message}</p>
        </div>
      </SChatUserMessage>
    </SChatUserMessages>
  );
};
