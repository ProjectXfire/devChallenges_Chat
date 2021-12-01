import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Image from "next/image";
// Providers
import { IoMdSend } from "react-icons/io";
import { IoAttach } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { useReactMediaRecorder } from "react-media-recorder";
// Utils
import { resizeImage } from "@utils/resizeImg";
import { convertToBase64Audio } from "@utils/convertToBase64Audio";
// Styles
import { SChatMessage } from "@styles/components/chat";
import { colors } from "@styles/variables/colors";
import { SInputFile } from "@styles/shared/inputGroup";
import { SChatMessageModal } from "@styles/components/chat";
import { SButton } from "@styles/shared/button";

type ChatMessageProps = {
  getMessage: (message: string, messageImg?: string, audio?: string) => void;
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
  const [activeRecord, setActiveRecord] = useState(false);
  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      video: false,
      blobPropertyBag: { type: "audio/wav" },
    });

  //******** METHODS ********/
  function handleMessage(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage({ ...message, text: e.target.value });
  }
  // Send message to chat
  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.text) {
      getMessage(message.text, message.img);
      setMessage({ text: "", img: "" });
      setShowMessageModal(false);
      setHideTextMessage(false);
    }
  }
  // Send audio to chat
  function sendAudio(audio: string | null | ArrayBuffer) {
    if (typeof audio === "string") {
      getMessage("Audio", "", audio);
    }
  }
  // Capture image selected
  function selectedImage(e: React.ChangeEvent<HTMLInputElement> | null) {
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      setShowMessageModal(true);
      setHideTextMessage(true);
      resizeImage(e.target.files[0], 70, 70).then((res) => {
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
  // Handle record
  function handleRecord() {
    const updateActiveRecord = !activeRecord;
    if (updateActiveRecord) {
      startRecording();
    } else {
      stopRecording();
    }
    setActiveRecord(updateActiveRecord);
  }

  // Tempo
  async function audio() {
    alert(mediaBlobUrl);
    if (typeof mediaBlobUrl === "string") {
      await convertToBase64Audio(mediaBlobUrl, (e) => {
        if (e.target) {
          sendAudio(e.target.result);
          clearBlobUrl();
        }
      });
    }
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
          <SButton
            type="submit"
            bkgColor={colors.blue}
            color={colors.lightWhite}
            hoverOff={true}
            width="40px"
            icon
          >
            <IoMdSend size="20" color={colors.white} />
          </SButton>
          <SInputFile>
            <IoAttach size={30} />
            <input
              type="file"
              onChange={(e) => {
                selectedImage(e);
              }}
            />
          </SInputFile>
          {activeRecord ? (
            <SButton
              type="button"
              bkgColor={colors.red}
              color={colors.lightWhite}
              hoverOff={true}
              width="40px"
              icon
            >
              <BiMicrophone
                size={20}
                color={colors.lightWhite}
                onClick={handleRecord}
              />
            </SButton>
          ) : (
            <SButton
              type="button"
              bkgColor={colors.darkBlack}
              color={colors.lightWhite}
              hoverOff={true}
              width="40px"
              icon
            >
              <BiMicrophone
                size={20}
                color={colors.lightWhite}
                onClick={handleRecord}
              />
            </SButton>
          )}
          <SButton
            hoverOff={true}
            width="40px"
            type="button"
            onClick={() => audio()}
          >
            SA
          </SButton>
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
