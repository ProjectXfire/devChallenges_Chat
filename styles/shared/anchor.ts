import styled from "styled-components";

type AnchorProps = {
  color?: string;
};

export const SAnchor = styled.a<AnchorProps>`
  max-width: 140px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) => (props.color ? props.color : "white")};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
