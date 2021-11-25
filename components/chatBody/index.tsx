import React, { useEffect } from "react";
// Styles
import { SChatBody, SChatBodyContent } from "@styles/components/chat";

export const ChatBody: React.FC = ({ children }) => {
  return (
    <SChatBody>
      <SChatBodyContent>{children}</SChatBodyContent>
    </SChatBody>
  );
};
