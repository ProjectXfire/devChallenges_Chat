import { colors } from "@styles/variables/colors";
import styled from "styled-components";

export const SSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${colors.mediumBlack};
  margin: 0 20px;
  margin-top: 60px;
  border-radius: 10px;
  input {
    border: none;
    outline: none;
    background-color: ${colors.mediumBlack};
    margin-left: 5px;
    color: ${colors.lightWhite};
    &::placeholder {
      color: ${colors.grey};
    }
  }
`;
