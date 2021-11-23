import { device } from "@styles/variables/screens";
import styled from "styled-components";

export const Container = styled.main`
  display: grid;
  overflow: hidden;
  -webkit-box-shadow: 0px -10px 7px 2px rgba(0, 0, 0, 0.4);
  box-shadow: 0px -10px 7px 2px rgba(0, 0, 0, 0.4);
  @media ${device.tabletL} {
    transform: translateX(0);
  }
  @media ${device.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
`;
