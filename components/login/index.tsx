import React from "react";
import Link from "next/link";
// Providers
import { BsChatDots } from "react-icons/bs";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { ErrorMessage } from "@hookform/error-message";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
// Styles
import {
  SLogin,
  SLoginContainer,
  SLogo,
  SLoginActions,
} from "@styles/components/login";
import { SInputGroup } from "@styles/shared/inputGroup";
import { SText } from "@styles/shared/text";
import { colors } from "@styles/variables/colors";
import { SButton } from "@styles/shared/button";
import { SErrorMessage } from "@styles/shared/errorMessage";

type LoginProps = {
  onLogin: (data: any, e: any) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: any;
  errorOnRequest: string;
  disable: boolean;
};

export const CLogin = ({
  onLogin,
  handleSubmit,
  setValue,
  errors,
  errorOnRequest,
  disable,
}: LoginProps) => {
  return (
    <SLogin>
      <SLoginContainer>
        <SLogo>
          <BsChatDots size="50" />
        </SLogo>
        <SText color={colors.lightWhite}>Login to Chatland</SText>
        <form onSubmit={handleSubmit(onLogin)}>
          <SInputGroup disable={disable}>
            <AiOutlineMail />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setValue("email", e.target.value)}
            />
          </SInputGroup>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <SErrorMessage>{message}</SErrorMessage>}
          />
          <SInputGroup disable={disable}>
            <AiOutlineLock />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setValue("password", e.target.value)}
            />
          </SInputGroup>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <SErrorMessage>{message}</SErrorMessage>}
          />
          <SLoginActions>
            <SButton
              type="submit"
              size="md"
              color={colors.mediumBlack}
              bkgColor={colors.lightWhite}
            >
              Login
            </SButton>
          </SLoginActions>
        </form>
        {errorOnRequest && (
          <SErrorMessage textAlign noMargin>
            {errorOnRequest}
          </SErrorMessage>
        )}
        <SText color={colors.lightWhite} center>
          If you do not have an account please register{" "}
          <Link href="/register">
            <a>
              <strong>here</strong>
            </a>
          </Link>
        </SText>
      </SLoginContainer>
    </SLogin>
  );
};
