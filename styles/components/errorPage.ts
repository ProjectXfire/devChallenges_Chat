import { colors } from "@styles/variables/colors";
import styled from "styled-components";

export const SErrorPage = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  h1 {
    font-size: 2.5rem;
  }
  p {
    color: ${colors.red};
    font-size: 1.5rem;
  }
`;
