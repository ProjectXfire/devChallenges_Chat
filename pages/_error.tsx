import { NextPage } from "next";
import React from "react";
// Components
import { Error } from "@components/error";

type ErrorPageProps = {
  statusCode?: number;
  message?: string;
};

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  return <Error statusCode={statusCode} message={message} />;
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
