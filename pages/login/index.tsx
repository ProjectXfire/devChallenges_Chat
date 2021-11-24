import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Providers
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useCookies } from "react-cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
// Models
import { LoginSchema } from "@models/schemas/login";
// Services
import { login } from "@services/request/auth";
// Utils
import { parseCookies } from "@utils/parseCookies";
import { useHandlePage } from "@utils/hooks/useHandlePage";
import { expireCookieDate } from "@utils/setExpireCookie";
// Components
import { CLogin } from "@components/login";

type InputData = {
  email: string;
  password: string;
};

type LoginPageProps = {
  apiURL: string;
  cookie: string;
};

//******** SSR ********//
// Validate cookie if exist
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const apiURL = process.env.API_URL;
  const cookie = parseCookies(ctx);
  if (cookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      apiURL: apiURL ? apiURL : "",
    },
  };
};

const Login = ({ apiURL }: LoginPageProps) => {
  //******** STATES ********//
  // Inputs form
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(LoginSchema) });
  // Handle page
  const { setCookie, errorOnRequest, setErrorOnRequest, disable, setDisable } =
    useHandlePage();

  //******** VARIABLES ********//
  const router = useRouter();

  //******** METHODS ********//
  // Login user
  const onLogin = (data: InputData, e: any) => {
    setErrorOnRequest("");
    setDisable(true);
    login(apiURL, data.email, data.password)
      .then((res) => {
        setCookie("user", res, { expires: expireCookieDate(), path: "/" });
        e.target.reset();
        router.push("/");
      })
      .catch((err) => {
        setDisable(false);
        setErrorOnRequest(err.message);
      });
  };

  //******** RENDER ********//
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CLogin
        onLogin={onLogin}
        handleSubmit={handleSubmit}
        setValue={setValue}
        errors={errors}
        errorOnRequest={errorOnRequest}
        disable={disable}
      />
    </>
  );
};

export default Login;
