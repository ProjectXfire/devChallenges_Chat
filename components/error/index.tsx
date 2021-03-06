import React from "react";
// Styles
import { SErrorPage } from "@styles/components/errorPage";

type ErrorProps = {
  statusCode?: number;
  message?: string;
};

export const Error = ({ statusCode, message }: ErrorProps) => {
  return (
    <SErrorPage>
      <div>
        <h1>Opps! Something is wrong 😔</h1>
        <p>Error: {message}</p>
      </div>
    </SErrorPage>
  );
};
