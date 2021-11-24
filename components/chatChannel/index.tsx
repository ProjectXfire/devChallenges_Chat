import React from "react";
// Providers
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";
// Models
import { TChannel } from "@models/types/channel/channel";
// Styles
import {
  SChatFooter,
  SChatMenuContent,
  SChatTitle,
  SChatChannels,
} from "@styles/components/chat";
import { SButton } from "@styles/shared/button";
// Components
import { ChatChanneltList } from "@components/chatChannelList";
import { Search } from "@components/shared/search";

type ChatChannelProps = {
  active: boolean;
  channels: TChannel[];
  showChatModal: () => void;
  showSidebarChannel: () => void;
  assingToChannel: (value: string) => void;
  searchChannels: (search: string) => void;
};

export const ChatChannel = ({
  active,
  channels,
  showChatModal,
  showSidebarChannel,
  assingToChannel,
  searchChannels,
}: ChatChannelProps) => {
  return (
    <SChatChannels active={active}>
      <SChatTitle justify>
        <span>
          <MdArrowBackIos size="20" onClick={() => showSidebarChannel()} />{" "}
          Members
        </span>
        <AiOutlinePlusCircle size="20" onClick={() => showChatModal()} />
      </SChatTitle>
      <Search searchChannels={searchChannels} />
      <SChatMenuContent>
        <h3>All Channels</h3>
        {channels.map((channel) => (
          <ChatChanneltList
            key={channel._id}
            name={channel.name}
            nameSearchKey={channel.nameSearchKey}
            assingToChannel={assingToChannel}
          />
        ))}
      </SChatMenuContent>
    </SChatChannels>
  );
};
