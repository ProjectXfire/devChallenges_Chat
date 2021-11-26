import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Image from "next/image";
// Providers
import { IoMdSend } from "react-icons/io";
import { IoAttach } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
// Utils
import { resizeImage } from "@utils/resizeImg";
// Styles
import { SChatMessage } from "@styles/components/chat";
import { colors } from "@styles/variables/colors";
import { SInputFile } from "@styles/shared/inputGroup";
import { SChatMessageModal } from "@styles/components/chat";

type ChatMessageProps = {
  getMessage: (message: string, messageImg?: string) => void;
  showMessageModal: boolean;
  setShowMessageModal: Dispatch<SetStateAction<boolean>>;
};

export const ChatMessage = ({
  getMessage,
  showMessageModal,
  setShowMessageModal,
}: ChatMessageProps) => {
  //******** STATES ********/
  const [message, setMessage] = useState({
    text: "",
    img: "",
  });
  const [hideTextMessage, setHideTextMessage] = useState(false);

  //******** METHODS ********/
  function handleMessage(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage({ ...message, text: e.target.value });
  }
  // Send message to chat
  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.img && message.text) {
      getMessage(message.text, message.img);
      setMessage({ text: "", img: "" });
      setShowMessageModal(false);
      setHideTextMessage(false);
    }
  }
  // Capture image selected
  function selectedImage(e: React.ChangeEvent<HTMLInputElement> | null) {
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      setShowMessageModal(true);
      setHideTextMessage(true);
      resizeImage(e.target.files[0], 100, 100).then((res) => {
        if (res !== null && typeof res === "string") {
          setMessage({ ...message, img: res });
        }
      });
    }
  }
  // Close message modal
  function closeMessageModal() {
    setShowMessageModal(false);
    setHideTextMessage(false);
    setMessage({ text: "", img: "" });
  }

  //******** RENDER ********/
  return (
    <>
      <SChatMessage showText={hideTextMessage}>
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={(e) => handleMessage(e)}
            value={message.text}
          />
          <button type="submit">
            <IoMdSend size="20" color={colors.white} />
          </button>
          <SInputFile>
            <IoAttach size={30} />
            <input
              type="file"
              onChange={(e) => {
                selectedImage(e);
              }}
            />
          </SInputFile>
        </form>
      </SChatMessage>
      {showMessageModal && (
        <SChatMessageModal>
          <form onSubmit={(e) => sendMessage(e)}>
            <h3>Preview image</h3>
            {message.img && (
              <Image
                src={message.img}
                alt="message-image"
                width={100}
                height={100}
                objectFit="contain"
              />
            )}
            <input
              type="text"
              placeholder="Add message"
              onChange={(e) => handleMessage(e)}
              value={message.text}
            />
            <div>
              <button type="submit">
                <IoMdSend size="20" color={colors.white} />
              </button>
              <button type="button" onClick={closeMessageModal}>
                <AiOutlineClose size="20" color={colors.white} />
              </button>
            </div>
          </form>
        </SChatMessageModal>
      )}
    </>
  );
};
