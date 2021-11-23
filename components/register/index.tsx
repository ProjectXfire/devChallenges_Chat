import React from "react";
import Link from "next/link";
// Providers
import { BsChatDots } from "react-icons/bs";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { ErrorMessage } from "@hookform/error-message";
import sanitizeHTML from "sanitize-html";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
// Styles
import {
  SRegister,
  SRegisterContainer,
  SLogo,
  SRegisterActions,
} from "@styles/components/register";
import { SInputGroup } from "@styles/shared/inputGroup";
import { SText } from "@styles/shared/text";
import { colors } from "@styles/variables/colors";
import { SButton } from "@styles/shared/button";
import { SErrorMessage } from "@styles/shared/errorMessage";

type RegisterProps = {
  onRegister: (data: any, e: any) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: any;
  errorOnRequest: string;
  disable: boolean;
};

export const CRegister = ({
  onRegister,
  handleSubmit,
  setValue,
  errors,
  errorOnRequest,
  disable,
}: RegisterProps) => {
  return (
    <SRegister>
      <SRegisterContainer>
        <SLogo>
          <BsChatDots size="50" />
        </SLogo>
        <SText color={colors.lightWhite}>
          PLease register and start shared your knowledges in this developer
          chat.
        </SText>
        <form onSubmit={handleSubmit(onRegister)}>
          <SInputGroup disable={disable}>
            <FaUserAlt />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                const username = sanitizeHTML(e.target.value, {
                  allowedTags: [],
                  allowedAttributes: {},
                });
                setValue("username", username);
              }}
              disabled={disable}
            />
          </SInputGroup>
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <SErrorMessage>{message}</SErrorMessage>}
          />
          <SInputGroup disable={disable}>
            <AiOutlineMail />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                const email = sanitizeHTML(e.target.value, {
                  allowedTags: [],
                  allowedAttributes: {},
                });
                setValue("email", email);
              }}
              disabled={disable}
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
              onChange={(e) => {
                const password = sanitizeHTML(e.target.value, {
                  allowedTags: [],
                  allowedAttributes: {},
                });
                setValue("password", password);
              }}
              disabled={disable}
            />
          </SInputGroup>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <SErrorMessage>{message}</SErrorMessage>}
          />
          <SRegisterActions>
            <SButton
              type="submit"
              size="md"
              color={colors.mediumBlack}
              bkgColor={colors.lightWhite}
            >
              Register
            </SButton>
          </SRegisterActions>
        </form>
        {errorOnRequest && (
          <SErrorMessage textAlign noMargin>
            {errorOnRequest}
          </SErrorMessage>
        )}
        <SText color={colors.lightWhite} center>
          Already a member?{" "}
          <Link href="/login">
            <a>
              <strong>Login</strong>
            </a>
          </Link>
        </SText>
      </SRegisterContainer>
    </SRegister>
  );
};
