import styled from "styled-components";

interface ButtonProps {
  width?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  bkgColor?: string;
}

export const SButton = styled.button<ButtonProps>`
  width: 100%;
  max-width: ${(props) => (props.width ? props.width : "100%")};
  padding: ${(props) => {
    if (props.size === "sm") {
      return "5px 0px";
    }
    if (props.size === "lg") {
      return "10px 0px";
    }
    return "8px 0px";
  }};
  font-size: ${(props) => {
    if (props.size === "sm") {
      return "0.8rem";
    }
    if (props.size === "lg") {
      return "1.3rem";
    }
    return "1rem";
  }};
  color: ${(props) => (props.color ? props.color : "white")};
  background-color: ${(props) => (props.bkgColor ? props.bkgColor : "black")};
  border: 1px solid ${(props) => (props.color ? props.color : "white")};
  outline: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  text-align: center;
  &:hover {
    color: ${(props) => (props.bkgColor ? props.bkgColor : "black")};
    background-color: ${(props) => (props.color ? props.color : "white")};
    border: 1px solid ${(props) => (props.bkgColor ? props.bkgColor : "black")};
  }
`;
