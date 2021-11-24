import React from "react";
// Styles
import { SErrorPage } from "@styles/components/errorPage";

const ErrorPage = () => {
  return (
    <SErrorPage>
      <div>
        <h1>Opps! Something is wrong 😔</h1>
        <p>Please try again</p>
      </div>
    </SErrorPage>
  );
};

export default ErrorPage;
