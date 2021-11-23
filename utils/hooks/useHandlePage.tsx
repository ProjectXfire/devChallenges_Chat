import { useState } from "react";
import { useCookies } from "react-cookie";

export const useHandlePage = () => {
  // Cookie
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // Error message on request
  const [errorOnRequest, setErrorOnRequest] = useState("");
  // Disable inputs on request
  const [disable, setDisable] = useState(false);

  return {
    cookies,
    setCookie,
    removeCookie,
    errorOnRequest,
    setErrorOnRequest,
    disable,
    setDisable,
  };
};
