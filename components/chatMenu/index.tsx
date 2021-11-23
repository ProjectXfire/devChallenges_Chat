import React from "react";
import Link from "next/link";
// Providers
import { MdArrowBackIos } from "react-icons/md";
// Models
import { TChannel } from "@models/types/channel/channel";
// Images
import defaultIMG from "@public/devchallenges.png";
// Styles
import {
  SChatFooter,
  SChatMenu,
  SChatMenuContent,
  SChatTitle,
} from "@styles/components/chat";
import { SButton } from "@styles/shared/button";
// Components
import { ChatList } from "@components/chatList";

type ChatMenuProps = {
  active: boolean;
  channel: TChannel;
  logout: () => void;
  showSidebarChannels: () => void;
};

export const ChatMenu = ({
  active,
  channel,
  logout,
  showSidebarChannels,
}: ChatMenuProps) => {
  return (
    <SChatMenu active={active}>
      <SChatTitle>
        <MdArrowBackIos size="20" onClick={() => showSidebarChannels()} />
        <span>All channels</span>
      </SChatTitle>
      <SChatMenuContent marginTop="50px">
        <h1>{channel.name}</h1>
        <p>{channel.description}</p>
        <h1>Members</h1>
        {channel.users?.map((user, index) => (
          <ChatList
            key={user._id}
            name={user.username}
            photo={user.avatar || defaultIMG}
          />
        ))}
      </SChatMenuContent>
      <SChatFooter>
        <SButton type="button" onClick={() => logout()}>
          Logout
        </SButton>
        <Link href="/profile">
          <a>
            <SButton type="button">Profile</SButton>
          </a>
        </Link>
      </SChatFooter>
    </SChatMenu>
  );
};
