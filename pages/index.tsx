import { useEffect, useState } from "react";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
// Providers
import { GiHamburgerMenu } from "react-icons/gi";
import sanitizeHTML from "sanitize-html";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useMediaQuery } from "react-responsive";
// Models
import { TChannel } from "@models/types/channel/channel";
import { ChannelSchema } from "@models/schemas/channel";
import { TChannelDto } from "@models/types/channel/channel.dto";
import { TMessages } from "@models/types/message/message";
import { TUser } from "@models/types/user/user";
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
import { Error } from "@components/error";

//******** SSR ********//
// Validate cookie if exist
// Get default channel 'Welcome'
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const apiURL = process.env.API_URL || "";
  const token = parseCookies(ctx);
  try {
    if (token) {
      const channel = await getOneByQuery(apiURL, token, "welcome");
      const messages = await getAllMessagesByChannel(
        apiURL,
        token,
        channel._id
      );
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
  } catch (error) {
    return {
      redirect: {
        destination: "/errorPage",
        permanent: false,
      },
    };
  }
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
  const [channelsForSearch, setChannelsForSearch] = useState<TChannel[]>([]);
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
      } catch (err: any) {
        setErrorOnRequest(err.message);
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
    try {
      setSidebarChannels(true);
      setSidebarChannel(false);
      const channels = await getAll(apiURL, token);
      setChannels(channels);
      setChannelsForSearch(channels);
    } catch (err: any) {
      setSidebarChannels(false);
      setSidebarChannel(false);
      setBackground(false);
      setErrorOnRequest(err.message);
    }
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
      .catch((err) => setErrorOnRequest(err.message));
  };
  // Search channels
  const searchChannels = (search: string) => {
    if (search) {
      const findChanneld = channelsForSearch.filter((channel) =>
        channel.name.toLowerCase().includes(search)
      );
      setChannels(findChanneld);
    } else {
      setChannels(channelsForSearch);
    }
  };

  //******** Use Effect ********//
  // Hide hamburguer icon in big screen
  // Connect and disconnect to socket to handle messages
  useEffect(() => {
    setShowIcon(isTablet);
    initiateSocket(apiURL, channel._id);
    subscribeToChat((err: any, data: TMessages[]) => {
      if (err) return;
      setMessagesByChannel(data);
    });
    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet, channelSelected]);

  //******** RENDER ********//
  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {errorOnRequest ? (
        <Error message={errorOnRequest} />
      ) : (
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
            searchChannels={searchChannels}
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
      )}
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
