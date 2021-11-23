import React from "react";

type ErrorProps = {
  statusCode?: number;
  message?: string;
};

export const Error = ({ statusCode, message }: ErrorProps) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>{message}</p>
    </div>
  );
};
