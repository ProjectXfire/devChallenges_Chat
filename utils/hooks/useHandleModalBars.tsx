import { useState } from "react";

export const useHandleModalBars = () => {
  // Handle Sidebars
  const [sidebarChannel, setSidebarChannel] = useState(false);
  const [sidebarChannels, setSidebarChannels] = useState(false);
  // Handle chat modal
  const [chatModal, setChatModal] = useState(false);
  // Handle background
  const [background, setBackground] = useState(false);

  return {
    sidebarChannel,
    setSidebarChannel,
    sidebarChannels,
    setSidebarChannels,
    chatModal,
    setChatModal,
    background,
    setBackground,
  };
};
