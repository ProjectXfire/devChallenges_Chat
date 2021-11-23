import { colors } from "@styles/variables/colors";
import styled from "styled-components";

export const SProfile = styled.section`
  width: 100%;
  max-width: 600px;
  height: 100%;
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 100px;
  justify-self: center;
`;

export const SProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.mediumBlack};
  h3 {
    margin: 0;
  }
  a {
    width: 100px;
  }
`;

export const SProfileBody = styled.table`
  width: 100%;
  margin-top: 40px;
  border-collapse: collapse;
  tr {
    border-bottom: 0.5px solid ${colors.mediumBlack};
  }
  td {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  img {
    border-radius: 10px;
  }
`;
