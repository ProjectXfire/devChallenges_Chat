import { colors } from "@styles/variables/colors";
import { device } from "@styles/variables/screens";
import styled from "styled-components";

export const SRegister = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SRegisterContainer = styled.div`
  width: 100%;
  max-height: 100%;
  max-width: 500px;
  padding: 20px 10px;
  background-color: ${colors.darkBlack};
  border-radius: 10px;
  @media ${device.tabletM} {
    border: 1px solid ${colors.lightWhite};
    padding: 80px 40px;
  }
`;

export const SRegisterActions = styled.div`
  margin: 20px 0px;
`;

export const SLogo = styled.div`
  position: relative;
  margin-bottom: 20px;
  &::after {
    position: absolute;
    content: "Chatland";
    font-weight: bold;
    font-size: 2rem;
    top: 5px;
    left: 60px;
  }
`;
