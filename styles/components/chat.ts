import { colors } from "@styles/variables/colors";
import { device } from "@styles/variables/screens";
import styled from "styled-components";

type ChatProps = {
  active?: boolean;
  justify?: boolean;
  marginTop?: string;
  modalActive?: boolean;
};

export const SChat = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  @media ${device.tabletL} {
    grid-template-columns: 1fr 2fr;
  }
  @media ${device.laptop} {
    grid-template-columns: 1fr 3fr;
  }
`;

export const SChatTitle = styled.div<ChatProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 10px;
  z-index: 1;
  text-transform: uppercase;
  justify-content: ${(props) => (props.justify ? "space-between" : "none")};
  align-items: center;
  background-color: ${colors.darkBlack};
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.85);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.85);
  svg {
    margin-right: ${(props) => (props.justify ? "0px" : "10px")};
    cursor: pointer;
  }
  span {
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;

export const SChatFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
`;

export const SChatList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  p {
    margin-left: 15px;
    color: ${colors.grey};
  }
  span {
    background-color: ${colors.darkBlack};
    padding: 5px 7px;
    border-radius: 5px;
  }
  img {
    border-radius: 50%;
  }
`;

export const SChatMenu = styled.div<ChatProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 20%;
  padding-bottom: 60px;
  background-color: ${colors.black};
  z-index: 2;
  transform: translateX(-100%);
  transition: all 0.5s ease-in-out;
  height: 100vh;
  transform: ${(props) =>
    props.active ? "translateX(0)" : "translateX(-100%)"};
  overflow: auto;
  @media ${device.tabletL} {
    width: 100%;
    position: initial;
    transform: translateX(0);
  }
`;

export const SChatChannels = styled.div<ChatProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 20%;
  background-color: ${colors.black};
  z-index: 3;
  transform: translateX(-100%);
  transition: all 0.5s ease-in-out;
  transform: ${(props) =>
    props.active ? "translateX(0)" : "translateX(-100%)"};
  overflow: auto;
  @media ${device.tabletL} {
    right: 67%;
  }
  @media ${device.laptop} {
    right: 75%;
  }
`;

export const SChatBody = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  @media ${device.tabletL} {
    transform: translate(0);
  }
`;

export const SChatBodyContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export const SChatContent = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 0 10px;
  color: white;
`;

export const SChatMenuContent = styled.div<ChatProps>`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "20px")};
  padding: 0 20px;
`;

export const SChatMessage = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: ${colors.darkBlack};
  form {
    margin: 5px;
    padding: 5px;
    display: flex;
    background-color: ${colors.mediumBlack};
    border-radius: 10px;
  }
  input {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: ${colors.mediumBlack};
    outline: none;
    color: ${colors.lightWhite};
    &::placeholder {
      color: ${colors.grey};
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${colors.blue};
  }
  svg {
    width: 25px;
  }
`;

export const SChatModal = styled.form<ChatProps>`
  position: fixed;
  display: grid;
  top: 100px;
  width: 100%;
  max-width: 600px;
  justify-self: center;
  align-self: center;
  padding: 20px;
  border-radius: 10px;
  background-color: ${colors.black};
  transition: all 0.5s ease-in-out;
  z-index: 4;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 4px 0px rgba(255, 255, 255, 0.3);
  transform: ${(props) =>
    props.modalActive ? "translateY(0%)" : "translateY(-150%)"};
  h3 {
    margin-top: 0;
  }
  span {
    margin-bottom: 10px;
    margin-left: 5px;
    font-size: 0.9rem;
    color: ${colors.red};
  }
  input {
    padding: 10px;
    margin-bottom: 5px;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: ${colors.mediumBlack};
    color: ${colors.lightWhite};
    &::placeholder {
      color: ${colors.grey};
    }
  }
  textarea {
    padding: 10px;
    margin-bottom: 5px;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: ${colors.mediumBlack};
    color: ${colors.lightWhite};
    &::placeholder {
      color: ${colors.grey};
    }
  }
  div {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button {
      margin-right: 5px;
    }
  }
`;
