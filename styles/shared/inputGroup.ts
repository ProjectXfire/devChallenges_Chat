import { colors } from "@styles/variables/colors";
import styled from "styled-components";

type InputGroup = {
  disable?: boolean;
};

export const SInputGroup = styled.div<InputGroup>`
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  background-color: ${colors.mediumBlack};
  opacity: ${(props) => (props.disable ? "0.5" : "initial")};
  input {
    width: 100%;
    background-color: ${colors.mediumBlack};
    outline: none;
    border: none;
    color: ${colors.lightWhite};
    &::placeholder {
      color: ${colors.grey};
    }
  }
  svg {
    color: ${colors.lightWhite};
    margin-right: 5px;
  }
`;

export const SInputFile = styled.label`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    margin-left: 5px;
  }
  cursor: pointer;
  input[type="file"] {
    display: none;
  }
`;

export const SInputFileGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  label {
    padding: 5px;
    margin-left: 20px;
    border-bottom: 2px solid ${colors.lightWhite};
    border-top: 2px solid ${colors.lightWhite};
  }
  img {
    border-radius: 5px;
  }
`;
