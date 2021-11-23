import styled from "styled-components";
import { colors } from "@styles/variables/colors";

type TextProps = {
  size?: string;
  color?: string;
  center?: boolean;
};

export const SText = styled.p<TextProps>`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : "1rem")};
  text-align: ${(props) => (props.center ? "center" : "normal")};
  margin: 5px 0;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;
