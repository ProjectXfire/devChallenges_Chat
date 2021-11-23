import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// Providers
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
// Models
import { RegisterSchema } from "@models/schemas/register";
import { TUserDto } from "@models/types/user/user.dto";
// Services
import { create } from "@services/request/user";
// Utils
import { parseCookies } from "@utils/parseCookies";
import { useHandlePage } from "@utils/hooks/useHandlePage";
// Components
import { CRegister } from "@components/register";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type RegisterPageProps = {
  apiURL: string;
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

const Register = ({ apiURL }: RegisterPageProps) => {
  //******** STATES ********//
  // Inputs form
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(RegisterSchema) });
  // Handle page
  const { errorOnRequest, setErrorOnRequest, disable, setDisable } =
    useHandlePage();

  //******** VARIABLES ********//
  const router = useRouter();

  //******** METHODS ********//
  // Register new user
  const onRegister = (data: TUserDto, e: any) => {
    data.avatar = "";
    data.code = "";
    setErrorOnRequest("");
    setDisable(true);
    create(apiURL, data)
      .then((res) => {
        setDisable(false);
        e.target.reset();
        router.push("/login");
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
        <title>Register</title>
        <meta name="description" content="register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CRegister
        onRegister={onRegister}
        handleSubmit={handleSubmit}
        setValue={setValue}
        errors={errors}
        errorOnRequest={errorOnRequest}
        disable={disable}
      />
    </>
  );
};

export default Register;
