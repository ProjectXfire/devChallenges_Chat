import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
// Providers
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
// Services
import { getOne } from "@services/request/user";
// Utils
import { parseCookies } from "@utils/parseCookies";
import { TUser } from "@models/types/user/user";
// Styles
import { SProfileHeader, SProfileBody } from "@styles/components/profile";
import { SButton } from "@styles/shared/button";
import { SAnchor } from "@styles/shared/anchor";
// Components
import { CProfile } from "@components/profile";
import { colors } from "@styles/variables/colors";

//******** SSR ********//
// Validate cookie if exist
// Get user profile
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const apiURL = process.env.API_URL || "";
  const token = parseCookies(ctx);
  if (token) {
    const profile = await getOne(apiURL, token);
    return {
      props: {
        profile,
      },
    };
  }
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

type ProfileProps = {
  profile: TUser;
};

const Profile = ({ profile }: ProfileProps) => {
  return (
    <CProfile>
      <Link href="/" passHref>
        <SAnchor color={colors.blue}>
          <MdKeyboardArrowLeft size={30} />
          Back to chat
        </SAnchor>
      </Link>
      <h1>Personal Info</h1>
      <div>
        <SProfileHeader>
          <h3>Profile</h3>
          <Link href={`/profile/edit`}>
            <a>
              <SButton
                bkgColor={colors.mediumBlack}
                color={colors.lightWhite}
                size="sm"
                width="100px"
              >
                Edit
              </SButton>
            </a>
          </Link>
        </SProfileHeader>
        <SProfileBody>
          <tbody>
            <tr>
              <td>Avatar:</td>
              <td>
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    width={60}
                    height={60}
                    alt="photo-user"
                  />
                ) : (
                  <MdInsertPhoto size={60} />
                )}
              </td>
            </tr>
            <tr>
              <td>Username:</td>
              <td>{profile.username}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{profile.email}</td>
            </tr>
          </tbody>
        </SProfileBody>
      </div>
    </CProfile>
  );
};

export default Profile;
