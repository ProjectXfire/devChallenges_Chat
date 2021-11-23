import { colors } from "@styles/variables/colors";
import styled from "styled-components";

type ErrorMessageprops = {
  noMargin?: boolean;
  textAlign?: boolean;
};

export const SErrorMessage = styled.span<ErrorMessageprops>`
  width: 100%;
  display: block;
  margin-left: ${(props) => (props.noMargin ? "0px" : "5px")};
  margin-bottom: 20px;
  color: ${colors.red};
  font-weight: 0.8rem;
  text-align: ${(props) => (!props.textAlign ? "none" : "center")};
`;
