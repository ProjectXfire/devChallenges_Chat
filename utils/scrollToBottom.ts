import { RefObject } from "react";

export const scrollToBottom = (ref: RefObject<HTMLHeadingElement>) => {
  setTimeout(() => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        block: "start",
        inline: "end",
      });
    }
  }, 500);
};
