import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
// Providers
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdPhotoCamera, MdInsertPhoto } from "react-icons/md";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import sanitizeHTML from "sanitize-html";
// Models
import { TUser } from "@models/types/user/user";
import { UserSchema } from "@models/schemas/user";
// Services
import { getOne, update } from "@services/request/user";
// Utils
import { parseCookies } from "@utils/parseCookies";
import { resizeImage } from "@utils/resizeImg";
import { useHandlePage } from "@utils/hooks/useHandlePage";
// Styles
import { SAnchor } from "@styles/shared/anchor";
import { colors } from "@styles/variables/colors";
import {
  SInputGroup,
  SInputFile,
  SInputFileGroup,
} from "@styles/shared/inputGroup";
import { SButton } from "@styles/shared/button";
// Components
import { CProfileEdit } from "@components/profileEdit";
import { TUserDto } from "@models/types/user/user.dto";
import { Error } from "@components/error";

//******** SSR ********//
// Validate cookie if exist
// Get user profile
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const apiURL = process.env.API_URL || "";
  const token = parseCookies(ctx);
  try {
    if (token) {
      const profile = await getOne(apiURL, token);
      return {
        props: {
          profile,
          apiURL,
          token,
        },
      };
    }
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/errorPage",
        permanent: false,
      },
    };
  }
};

type ProfileProps = {
  profile: TUser;
  apiURL: string;
  token: string;
};

const EditProfile = ({ profile, apiURL, token }: ProfileProps) => {
  //******** STATES ********//
  // Inputs form
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({ resolver: joiResolver(UserSchema) });
  // Get image selected in input
  const [image, setImage] = useState<string>(profile.avatar);
  // Handle page
  const { errorOnRequest, setErrorOnRequest } = useHandlePage();

  //******** VARIABLES ********//
  const router = useRouter();

  //******** Methods ********//
  // Update profile
  const updateProfile = (data: TUserDto, e: any) => {
    data.avatar = image;
    update(apiURL, token, data)
      .then((res) => {
        router.push("/profile");
      })
      .catch((err) => setErrorOnRequest(err.message));
  };
  // Capture image selected
  const selectedImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      resizeImage(e.target.files[0], 60, 60).then((res) => {
        if (res !== null && typeof res === "string") {
          setImage(res);
        }
      });
    }
  };

  //******** Use Effect ********//
  useEffect(() => {
    setValue("username", profile.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {errorOnRequest ? (
        <Error message={errorOnRequest} />
      ) : (
        <CProfileEdit>
          <Link href="/profile" passHref>
            <SAnchor color={colors.blue}>
              <MdKeyboardArrowLeft size={30} />
              Back to profile
            </SAnchor>
          </Link>
          <h1>Personal Info - Edit</h1>
          <form onSubmit={handleSubmit(updateProfile)}>
            <label htmlFor="username">Username</label>
            <SInputGroup>
              <input
                type="text"
                {...register("username")}
                onChange={(e) => {
                  const username = sanitizeHTML(e.target.value, {
                    allowedTags: [],
                    allowedAttributes: {},
                  });
                  setValue("username", username);
                }}
              />
            </SInputGroup>
            <label htmlFor="avatar">Avatar</label>
            <SInputFileGroup>
              {image ? (
                <Image
                  src={image}
                  width={60}
                  height={60}
                  alt="photo-user"
                  objectFit="contain"
                />
              ) : (
                <MdInsertPhoto size={60} />
              )}
              <SInputFile>
                <MdPhotoCamera size={30} /> Change
                <input
                  type="file"
                  onChange={(e) => {
                    selectedImage(e);
                  }}
                />
              </SInputFile>
            </SInputFileGroup>
            <SButton
              type="submit"
              width="100px"
              bkgColor={colors.mediumBlack}
              color={colors.lightWhite}
            >
              Save
            </SButton>
          </form>
        </CProfileEdit>
      )}
    </>
  );
};

export default EditProfile;
