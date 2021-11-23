import { useEffect, useState } from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
// Providers
import { GiHamburgerMenu } from "react-icons/gi";
import sanitizeHTML from "sanitize-html";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useMediaQuery } from "react-responsive";
import io from "socket.io-client";
// Models
import { TChannel } from "@models/types/channel/channel";
import { ChannelSchema } from "@models/schemas/channel";
import { TChannelDto } from "@models/types/channel/channel.dto";
import { TMessages } from "@models/types/message/message";
// Services
import {
  getOneByQuery,
  getAll,
  create,
  assignUserToChannel,
} from "@services/request/channel";
import { getAllMessagesByChannel } from "@services/request/message";
import { getOne } from "@services/request/user";
// Utils
import { parseCookies } from "@utils/parseCookies";
import { useHandlePage } from "@utils/hooks/useHandlePage";
import { useHandleModalBars } from "@utils/hooks/useHandleModalBars";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from "@utils/handleSocket";
// Styles
import { Background } from "@styles/shared/background";
import { SChatTitle, SChatContent } from "@styles/components/chat";
// Componentes
import { Chat } from "@components/chat";
import { ChatMenu } from "@components/chatMenu";
import { ChatChannel } from "@components/chatChannel";
import { ChatBody } from "@components/chatBody";
import { ChatMessage } from "@components/chatMessage";
import { ChatModal } from "@components/chatModal";
import { ChatUserMessages } from "@components/chatUserMessages";
import { TUser } from "@models/types/user/user";

//******** SSR ********//
// Validate cookie if exist
// Get default channel 'Welcome'
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const apiURL = process.env.API_URL || "";
  const token = parseCookies(ctx);
  if (token) {
    const channel = await getOneByQuery(apiURL, token, "welcome");
    const messages = await getAllMessagesByChannel(apiURL, token, channel._id);
    return {
      props: {
        apiURL,
        channel,
        token,
        messages,
      },
    };
  }
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

type HomeProps = {
  apiURL: string;
  channel: TChannel;
  token: string;
  messages: TMessages[];
};

const Home = ({ apiURL, channel, token, messages }: HomeProps) => {
  //******** VARIABLES ********//
  const router = useRouter();
  let socket: any;

  //******** STATES ********//
  // Inputs form
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(ChannelSchema) });
  //
  // Handle page
  const { removeCookie, setErrorOnRequest, errorOnRequest } = useHandlePage();
  // Handle Sidebars and Modals
  const {
    sidebarChannel,
    setSidebarChannel,
    sidebarChannels,
    setSidebarChannels,
    chatModal,
    setChatModal,
    background,
    setBackground,
  } = useHandleModalBars();
  // Handle Hamburguer icon
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const [showIcon, setShowIcon] = useState(false);

  // Channels data
  const [channels, setChannels] = useState<TChannel[]>([]);
  const [channelSelected, setChannelSelected] = useState<TChannel>(channel);
  const [messagesByChannel, setMessagesByChannel] =
    useState<TMessages[]>(messages);

  //******** METHODS ********//
  // Get chat message and emit
  const getMessage = async (message: string) => {
    const sanitizeMessage = sanitizeHTML(message, {
      allowedTags: [],
      allowedAttributes: {},
    });
    if (sanitizeMessage) {
      try {
        const user: TUser = await getOne(apiURL, token);
        const payload = {
          channel: channelSelected._id,
          message: sanitizeMessage,
          user: user._id,
        };
        sendMessage(payload);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handle sidebars
  const showSidebarChannel = () => {
    setSidebarChannels(false);
    setSidebarChannel(true);
    setBackground(true);
  };
  const showSidebarChannels = async () => {
    setSidebarChannels(true);
    setSidebarChannel(false);
    const channels = await getAll(apiURL, token);
    setChannels(channels);
  };
  const hideAllSidebar = () => {
    setSidebarChannel(false);
    setSidebarChannels(false);
    setChatModal(false);
    setBackground(false);
  };
  // Logout
  const logout = () => {
    removeCookie("user");
    router.push("/login");
  };
  // Handle modal channel
  const showChatModal = () => {
    setChatModal(true);
    setSidebarChannels(false);
  };
  const hideChatChannel = () => {
    setChatModal(false);
    setBackground(false);
    setValue("name", "");
    setValue("description", "");
  };
  // Create new channel
  const newChannel = (data: TChannelDto, e: any) => {
    data.users = [];
    create(apiURL, token, data)
      .then((res) => {
        setChatModal(false);
        setBackground(false);
        e.target.reset();
      })
      .catch((err) => setErrorOnRequest(err.message));
  };
  // Assign user to channel
  const assingToChannel = (nameSearchKey: string) => {
    assignUserToChannel(apiURL, token, nameSearchKey)
      .then((res) => {
        setChannelSelected(res.channel);
        setMessagesByChannel(res.messagesByChannel);
        hideAllSidebar();
      })
      .catch((err) => console.log(err));
  };

  //******** Use Effect ********//
  useEffect(() => {
    setShowIcon(isTablet);
    initiateSocket(apiURL);
    subscribeToChat((err: any, data: TMessages[]) => {
      if (err) return;
      setMessagesByChannel(data);
    });
    return () => {
      disconnectSocket();
    };
  }, [isTablet]);

  //******** RENDER ********//
  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Chat>
        <ChatMenu
          active={sidebarChannel}
          channel={channelSelected}
          logout={logout}
          showSidebarChannels={showSidebarChannels}
        />
        <ChatChannel
          active={sidebarChannels}
          channels={channels}
          showChatModal={showChatModal}
          showSidebarChannel={showSidebarChannel}
          assingToChannel={assingToChannel}
        />
        <ChatBody>
          <SChatTitle>
            {showIcon && (
              <GiHamburgerMenu size="20" onClick={showSidebarChannel} />
            )}
            <span>{channelSelected.name}</span>
          </SChatTitle>
          <SChatContent>
            {messagesByChannel.map((message) => (
              <ChatUserMessages key={message._id} message={message} />
            ))}
          </SChatContent>
          <ChatMessage getMessage={getMessage} />
        </ChatBody>
      </Chat>
      <ChatModal
        modalActive={chatModal}
        hideChatChannel={hideChatChannel}
        handleSubmit={handleSubmit}
        setValue={setValue}
        errors={errors}
        newChannel={newChannel}
        errorOnRequest={errorOnRequest}
      />
      {background && <Background onClick={hideAllSidebar} />}
    </>
  );
};

export default Home;
